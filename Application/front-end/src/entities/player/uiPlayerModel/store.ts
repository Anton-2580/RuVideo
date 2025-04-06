import { create } from "zustand"
import type { PlayerState, PlayerRefs } from "../types"

type ActiveStyles = {
    play: string
}

type UIPlayerState = PlayerState & {
    refs?: PlayerRefs
    setMute: (isMuted: boolean) => void
    lastVolumeOpacity: [string, string]
    isFullScreen: boolean
    setActiveStyles: (fn: (ActiveStyles: ActiveStyles) => ActiveStyles) => void
    ActiveStyles: ActiveStyles
}


export const useUIPlayerStore = create<UIPlayerState>((set, get) => ({
    refs: undefined,
    getRefs: () => get().refs,
    setRefs: (refs) => set({ refs }),

    setActiveStyles: (fn) => set(state => ({ ActiveStyles: fn(state.ActiveStyles) })),
    ActiveStyles: {
        play: ""
    },

    onMouseMove: () => set(state => {
        clearTimeout(state.timeouts?.drag)
        if (!state.refs?.videoContainer.current)
            return {};

        const videoControllers = state.refs.videoContainer.current.children[1] as HTMLDivElement
        videoControllers.style.opacity = '1'
        document.documentElement.style.cursor = "auto"

        return {
            timeouts: {
                drag: setTimeout(() => {
                    videoControllers.style.opacity = '0'

                    if (get().isFullScreen)
                        document.documentElement.style.cursor = "none"
                }, 4000)
            } 
        }
    }),

    isFullScreen: false,
    setFullScreen: () => {
        const refs = get().refs

        if (!refs?.videoContainer?.current) 
            return

        if (!document.fullscreenElement) {
            set(() => ({ isFullScreen: true }))
            refs.videoContainer.current.requestFullscreen();
        } else {
            set(() => ({ isFullScreen: false }))
            document.exitFullscreen();
        }
    },

    lastVolumeOpacity: ['1', '1'],
    setMute: (isMuted) => {
        const refs = get().refs

        if (!refs?.dinamicBtn.current) 
            return

        const images = refs.dinamicBtn.current.children[0].children as HTMLCollectionOf<HTMLImageElement>
        const lastVolumeOpacity = get().lastVolumeOpacity
        if (isMuted) {
            lastVolumeOpacity[0] = images[1].style.opacity
            lastVolumeOpacity[1] = images[2].style.opacity
            images[1].style.opacity = '0'
            images[2].style.opacity = '0'
        } else {
            images[1].style.opacity = lastVolumeOpacity[0]
            images[2].style.opacity = lastVolumeOpacity[1]
        }
    },

    setPlay: () => {
        const refs = get().refs
        const activeStyle = get().ActiveStyles.play

        if (!refs?.playBtn?.current) 
            return

        if (refs.playBtn.current.className.includes(activeStyle)) {
            refs.playBtn.current.className = refs.playBtn.current.className.replace(' ' + activeStyle, '')
        } else {
            refs.playBtn.current.className += ' ' + activeStyle
        }
    },

    changeTime: (event) => {
        const refs = get().refs

        if (refs?.seeLine?.current && event.nativeEvent.offsetX >= 0 && event.nativeEvent.offsetX <= refs.seeLine.current.offsetWidth) {
            const spans = refs.seeLine.current.children as HTMLCollectionOf<HTMLSpanElement>

            const percent = event.nativeEvent.offsetX / refs.seeLine.current.offsetWidth * 100

            spans[1].style.width = `${percent}%`
            spans[2].style.left = `${percent}%`
        }
    },

    changeMute: (event) => {
        const refs = get().refs 

        if (!refs?.dinamicBtn?.current) 
            return undefined
        
        const indicator = refs.dinamicBtn.current.children[1] as HTMLDivElement
        if (!(event.nativeEvent.offsetX >= 0 && event.nativeEvent.offsetX <= indicator.offsetWidth))
            return undefined
        
        const spans = indicator.children as HTMLCollectionOf<HTMLSpanElement>
        const images = refs.dinamicBtn.current.children[0].children as HTMLCollectionOf<HTMLImageElement>

        const newVolume = event.nativeEvent.offsetX / indicator.offsetWidth

        spans[1].style.width = `${newVolume * 100}%`
        spans[2].style.left = `${newVolume * 100}%`

        if (newVolume == 0) {
            images[1].style.opacity = '0'
            images[2].style.opacity = '0'
        } else {
            images[1].style.opacity = '1'
            images[2].style.opacity = newVolume >= 0.5 ? '1' : '0'
        }

        return newVolume
    },
}))
