import { create } from "zustand"
import type { RefObject } from "react"
import type { SpecificPlayerState } from "../specificPlayerTypes"
import type { TextTracksAddedEvent, MediaPlayerClass, Representation, TextTrackInfo, QualityChangeRequestedEvent } from "dashjs"
import { useUIPlayerStore } from "../uiPlayerModel/store"


type DashPlayerState = SpecificPlayerState & {
    playerRef: RefObject<MediaPlayerClass | null> | null
    setPlayerRef: (newPlayerRef: RefObject<MediaPlayerClass | null>) => void
    lastVolume: number

    setOnListeners: () => void
    setOffListeners: () => void
    bufferLevelUpdated: () => void
    playbackStarted: () => void
    playbackPaused: () => void
    playbackRateChanged: () => void
    qualityChangeRequested: () => void
    updateCurrentSubtitlesLang: () => void
    allTextTracksAdded: (e: TextTracksAddedEvent) => void
    streamActivated: () => void

    subtitles: TextTrackInfo[]
    representations: Representation[]
    currentRepresentation: string
    currentSubtitlesLang: string | null
    currentSpeed: number
}


export const useDashPlayerStore = create<DashPlayerState>((set, get) => ({
    playerRef: null,
    setPlayerRef: (playerRef) => set({ playerRef }),

    getRefs: useUIPlayerStore.getState().getRefs,
    setRefs: useUIPlayerStore.getState().setRefs,

    interval: null,
    startStateInterval: () => set(state => {
        if (state.interval)
            return {}

        const update = get().update
        update()
        return {
            interval: setInterval(update, 200)
        }
    }),
    clearStateInterval: () => set(state => {
        if (state.interval !== null)
            clearInterval(state.interval)

        return {interval: null}
    }),

    setDisplayTime: () => {
        const refs = get().getRefs()
        const playerRef = get().playerRef

        if (!refs?.timeDisplay.current || !playerRef?.current) 
            return

        const timeSpans = refs.timeDisplay.current.children as HTMLCollectionOf<HTMLSpanElement>
        timeSpans[0].textContent = playerRef.current.convertToTimeCode(playerRef.current.time())
    },

    update: () => {
        const refs = get().getRefs()
        const playerRef = get().playerRef

        if (!refs?.seeLine.current || !playerRef?.current || !refs.timeDisplay.current)
            return

        if (playerRef.current?.isPaused()) 
            return get().clearStateInterval()

        const percent = playerRef.current.time() / playerRef.current.duration() * 100
        
        const lineSpans = refs.seeLine.current.children as HTMLCollectionOf<HTMLSpanElement>
        lineSpans[1].style.width = `${percent}%`
        lineSpans[2].style.left = `${percent}%`

        get().setDisplayTime()
    },

    setOnListeners: () => {
        const player = get().playerRef?.current
        if (!player)
            return ;

        const funcs = get()

        player.on("bufferLevelUpdated", get().bufferLevelUpdated)
        player.on("playbackStarted", funcs.playbackStarted)
        player.on("playbackPaused", funcs.playbackPaused)
        player.on("streamActivated", funcs.streamActivated)
        player.on("allTextTracksAdded", funcs.allTextTracksAdded)
        player.on("playbackRateChanged", funcs.playbackRateChanged)
        player.on("qualityChangeRequested", funcs.qualityChangeRequested)
    },
    setOffListeners: () => {
        const player = get().playerRef?.current
        if (!player)
            return ;

        const funcs = get()

        player.off("bufferLevelUpdated", funcs.bufferLevelUpdated)
        player.off("playbackStarted", funcs.playbackStarted)
        player.off("playbackPaused", funcs.playbackPaused)
        player.off("streamActivated", funcs.streamActivated)
        player.off("allTextTracksAdded", funcs.allTextTracksAdded)
        player.off("playbackRateChanged", funcs.playbackRateChanged)
        player.off("qualityChangeRequested", funcs.qualityChangeRequested)
    },

    qualityChangeRequested: () => set(state => {
        const height = state.playerRef?.current?.getCurrentRepresentationForType("video")?.height
        if (state.playerRef?.current?.getSettings().streaming?.abr?.autoSwitchBitrate?.video) {
            return { currentRepresentation: `Auto(${height})p` }
        }

        return { currentRepresentation: height + 'p' }
    }),
    playbackStarted: () => {
        useUIPlayerStore.getState().setPlay()
        get().startStateInterval()
    },
    playbackPaused: () => {
        useUIPlayerStore.getState().setPlay()
    },
    subtitles: [],
    allTextTracksAdded: (e) => set({ subtitles: e.tracks }),
    currentSpeed: 1,
    playbackRateChanged: () => set({ currentSpeed: (get().playerRef?.current?.getPlaybackRate() ?? 1) }),

    currentSubtitlesLang: null,
    currentRepresentation: "",
    representations: [],
    streamActivated: () => {
        const player = get().playerRef?.current
        if (!player)
            return 

        get().qualityChangeRequested()
        set(state => ({
            representations: player.getRepresentationsByType("video"),
            currentSubtitlesLang: state.subtitles[player.getCurrentTextTrackIndex()]?.lang,
            currentSpeed: player.getPlaybackRate(),
        }))
    },

    updateCurrentSubtitlesLang: () => set(state => ({
        currentSubtitlesLang: state.subtitles[state.playerRef?.current?.getCurrentTextTrackIndex() ?? -1]?.lang
    })),

    bufferLevelUpdated: () => {
        const player = get().playerRef?.current
        const lineSpans = get().getRefs()?.seeLine.current?.children as HTMLCollectionOf<HTMLSpanElement>
        if (!player || !lineSpans)
            return

        const dashMetrics = player.getDashMetrics()
        let bufferLevel = 0;
        if (dashMetrics) {
          bufferLevel = dashMetrics.getCurrentBufferLevel("video")
          if (!bufferLevel) {
            bufferLevel = dashMetrics.getCurrentBufferLevel("audio")
          }
        }

        lineSpans[3].style.left = `${player.time() / player.duration() * 100}%`
        lineSpans[3].style.width = `${bufferLevel / player.duration() * 100}%`
    },

    onMouseMove: (event) => {
        clearTimeout(get().timeouts?.drag)
        if (get().interval === null && !get().playerRef?.current?.isPaused())
            get().startStateInterval()

        useUIPlayerStore.getState().onMouseMove(event)
        set(() => (
            {
                timeouts: {
                    drag: setTimeout(() => {
                        get().clearStateInterval()
                    }, 4500)
                } 
            }
        ))
    },

    lastVolume: 0.5,
    setMute: () => {
        const playerRef = get().playerRef
        const lastVolume = get().lastVolume

        if (!playerRef?.current) 
            return

        if (playerRef.current.isMuted()) {
            playerRef.current.setMute(false)
            
            playerRef.current.setVolume(lastVolume)
        } else {
            playerRef.current.setMute(true)
            set(state => ({ lastVolume: state?.playerRef?.current?.getVolume() }))
        }

        useUIPlayerStore.getState().setMute(playerRef.current.isMuted())
    },

    setPlay: () => {
        const playerRef = get().playerRef

        if (!playerRef?.current) 
            return
        
        if (playerRef.current.isPaused()) {
            playerRef.current.play()
        } else {
            playerRef.current.pause()
        }
    },

    changeTime: (event) => {
        useUIPlayerStore.getState().changeTime(event)
    },

    finishChangeTime: (event) => {
        get().changeTime(event)

        const refs = get().getRefs()
        const playerRef = get().playerRef

        if (!refs?.seeLine.current || !refs?.timeDisplay.current || !playerRef?.current)
            return

        const isPaused = playerRef.current.isPaused()

        const percent = (refs.seeLine.current.children as HTMLCollectionOf<HTMLSpanElement>)[1].style.width
        const time = Number(percent.replace('%', '')) /  100 * playerRef.current.duration()

        playerRef.current.seek(time)
        if (isPaused)
            playerRef.current.pause()

        get().setDisplayTime()
    },

    changeMute: (event) => {
        const playerRef = get().playerRef
        const newVolume = useUIPlayerStore.getState().changeMute(event)

        if (!newVolume || !playerRef?.current)
            return  
        
        playerRef.current.setVolume(newVolume)
        newVolume == 0 ? playerRef.current.setMute(true) : playerRef.current.setMute(false)
    },

    setFullScreen: () => {
        useUIPlayerStore.getState().setFullScreen()
    },
}))
