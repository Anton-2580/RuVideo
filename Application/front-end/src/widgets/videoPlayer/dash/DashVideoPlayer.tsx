import { useCallback, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import type { MediaPlayerClass } from "dashjs"
import { MediaPlayer } from "dashjs"
// import { MediaPlayer } from "dashjs/dist/modern/esm/dash.mediaplayer.min.js"  // how do this
import { useUIPlayerStore, useDashPlayerStore } from "@/entities"
import type { SpecificVideoPlayerProps } from "../VideoPlayer"
import type { SettingsOpenItemProps } from "../UIVideoPlayer"
import UIVideoPlayer from "../UIVideoPlayer"
import styles from "../uicontrollbar.module.css"


export default function DashVideoPlayer({ src, title }: SpecificVideoPlayerProps) {
    const { t } = useTranslation()

    const refs = useUIPlayerStore(state => state.refs)
    const playerRef = useRef<MediaPlayerClass>(null)
    const setPlayerRef = useDashPlayerStore(state => state.setPlayerRef)
    if (!playerRef.current)
        setPlayerRef(playerRef)

    const startInterval = useDashPlayerStore(state => state.startStateInterval)
    const clearStateInterval = useDashPlayerStore(state => state.clearStateInterval)
    const setOnListeners = useDashPlayerStore(state => state.setOnListeners)
    const setOffListeners = useDashPlayerStore(state => state.setOffListeners)

    const setPlay = useDashPlayerStore(state => state.setPlay)
    const setMute = useDashPlayerStore(state => state.setMute)
    const changeMute = useDashPlayerStore(state => state.changeMute)
    const changeTime = useDashPlayerStore(state => state.changeTime)
    const finishChangeTime = useDashPlayerStore(state => state.finishChangeTime)
    const setFullScreen = useDashPlayerStore(state => state.setFullScreen)
    const onMouseMove = useDashPlayerStore(state => state.onMouseMove)

    useEffect(() => {
        if (!refs?.videoRef?.current) 
            return 
        
        playerRef.current = MediaPlayer().create()
    
        playerRef.current.initialize(refs.videoRef.current, src, true)
        playerRef.current.updateSettings({
            streaming: {
                text: {
                    defaultEnabled: true,
                },
                abr: {
                    autoSwitchBitrate: {
                        video: true,
                    },
                },
            },
        })
        playerRef.current.attachView(refs.videoRef.current)

        updateData()
        setOnListeners()
        startInterval()

        return () => {
            setOffListeners()
            clearStateInterval()

            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        }
    }, [])

    const updateData = useCallback(() => {
        setTimeout(() => {
            if (!refs?.timeDisplay?.current || !playerRef?.current?.duration()) 
                return updateData()

            const fullTime = refs.timeDisplay.current.children[2] as HTMLSpanElement

            fullTime.textContent = playerRef.current?.isDynamic() ? "● Live" : 
                playerRef.current.convertToTimeCode(playerRef.current.duration())
        }, 100)
    }, [refs?.timeDisplay, playerRef])


    const qualityChangeRequested = useDashPlayerStore(state => state.qualityChangeRequested)
    const Representations = useCallback(function({ onClick }: SettingsOpenItemProps) {
        const representations = useDashPlayerStore(state => state.representations)
        const autoSwitchBitrate = playerRef.current?.getSettings().streaming?.abr?.autoSwitchBitrate

        if (!autoSwitchBitrate)
            return

        return (<>
            <p className={styles.settings_item} key={"auto"} 
                onClickCapture={() => {
                    autoSwitchBitrate.video = true

                    qualityChangeRequested()
                    onClick && onClick()
                }}
            >{t("player.representationAuto")}</p>
            {
                representations.map((i) => (
                    <p className={styles.settings_item} key={i.id}
                        onClickCapture={() => {
                            autoSwitchBitrate.video = false

                            playerRef.current?.setRepresentationForTypeByIndex("video", i.index)
                            onClick && onClick()
                        }}
                    >{i.height}</p>
                ))
            }
        </>)
    }, [])

    const subtitles = useDashPlayerStore(state => state.subtitles)
    const Subtitles = useCallback(function({ onClick }: SettingsOpenItemProps) {
        const subtitles = useDashPlayerStore(state => state.subtitles)
        const updateCurrentSubtitlesLang = useDashPlayerStore(state => state.updateCurrentSubtitlesLang)

        const click = (index: number) => {
            playerRef.current?.setTextTrack(index)
            updateCurrentSubtitlesLang()

            onClick && onClick()
        }

        return (<>
            <p className={styles.settings_item} key={"noSubtitles"}
                onClickCapture={() => click(-1)}
            >{ t("player.subtitlesDoOff") }</p>
            {
                subtitles.map((i) => (
                    <p className={styles.settings_item} key={i.id}
                        onClickCapture={() => click(i.index ?? -1)}
                    >{i.lang}</p>
                ))
            }
        </>)
    }, [])

    const Speed = useCallback(function({ onClick }: SettingsOpenItemProps) {
        return <>{
            [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((i, index) => (
                <p className={styles.settings_item} key={index}
                    onClickCapture={() => {
                        playerRef.current?.setPlaybackRate(i)
                        onClick && onClick()
                    }}
                >{i}x</p>
            ))
        }</>
    }, [])

    const currentRepresentation = useDashPlayerStore(state => state.currentRepresentation)
    const currentSubtitlesLang = useDashPlayerStore(state => state.currentSubtitlesLang)
    const currentSpeed = useDashPlayerStore(state => state.currentSpeed)

    return (<UIVideoPlayer 
        title={title}
        setMute={setMute}
        setPlay={setPlay}
        changeMute={changeMute}
        changeTime={changeTime}
        finishChangeTime={finishChangeTime}
        setFullScreen={setFullScreen}
        onMouseMove={onMouseMove}
        settingsProps={{
            Quality: Representations,
            currentQuality: currentRepresentation.replace("Auto", t("player.representationAuto")),
            Speed: Speed,
            currentSpeed: currentSpeed + "x",
            Subtitles: subtitles.length ? Subtitles : undefined,
            currentSubtitle: subtitles.length ? (currentSubtitlesLang ?? t("player.subtitlesOff")) : t("player.subtitlesNone"),
        }}
    />)
}