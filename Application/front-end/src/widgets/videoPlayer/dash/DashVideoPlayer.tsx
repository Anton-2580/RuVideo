import { useCallback, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import type { SpecificVideoPlayerProps } from "../VideoPlayer"
import type { SettingsOpenItemProps } from "../UIVideoPlayer"
import UIVideoPlayer from "../UIVideoPlayer"
import { DashPlayerViewModel } from "../ViewModels"
import styles from "../uicontrollbar.module.css"
import { MediaPlayer } from "dashjs"


export default function DashVideoPlayer({ src, title, refs }: SpecificVideoPlayerProps) {
    const { t } = useTranslation()

    const viewModel = useRef(new DashPlayerViewModel(
        refs, 
        {
            play: styles.PlayPauseBtnActive,
        },
    ))

    useEffect(() => {
        if (!refs.videoRef.current) 
            return 

        viewModel.current.player = MediaPlayer().create()
        viewModel.current.player.initialize(refs.videoRef.current, src, true)
        viewModel.current.player.updateSettings({
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
        viewModel.current.player.attachView(refs.videoRef.current)

        updateData()
        viewModel.current.setOnListeners()
        viewModel.current.startInterval()

        return () => {
            viewModel.current.setOffListeners()
            viewModel.current.clearInterval()

            viewModel.current.player.destroy()
        }
    }, [refs.videoRef])

    const updateData = useCallback(() => {
        setTimeout(() => {
            if (!refs?.timeDisplay?.current || !viewModel.current.player.duration()) 
                return updateData()

            const fullTime = refs.timeDisplay.current.children[2] as HTMLSpanElement

            fullTime.textContent = viewModel.current.player.isDynamic() 
                ? "● Live" 
                : viewModel.current.player.convertToTimeCode(viewModel.current.player.duration())
        }, 100)
    }, [refs.timeDisplay])


    const Representations = useCallback(function({ onClick }: SettingsOpenItemProps) {
        const representations = viewModel.current.representations
        const autoSwitchBitrate = viewModel.current.player.getSettings().streaming?.abr?.autoSwitchBitrate

        if (!autoSwitchBitrate)
            return

        return (<>
            <p className={styles.settings_item} key={"auto"} 
                onClickCapture={() => {
                    autoSwitchBitrate.video = true

                    viewModel.current?.qualityChangeRequested()
                    onClick && onClick()
                }}
            >{t("player.representationAuto")}</p>
            {
                representations.map((i) => (
                    <p className={styles.settings_item} key={i.id}
                        onClickCapture={() => {
                            autoSwitchBitrate.video = false

                            viewModel.current.player.setRepresentationForTypeByIndex("video", i.index)
                            onClick && onClick()
                        }}
                    >{i.height}</p>
                ))
            }
        </>)
    }, [])

    const Subtitles = useCallback(function({ onClick }: SettingsOpenItemProps) {
        const subtitles = viewModel.current.subtitles

        const click = (index: number) => {
            viewModel.current.player.setTextTrack(index)
            viewModel.current.updateCurrentSubtitlesLang()

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
                        viewModel.current.player.setPlaybackRate(i)
                        onClick && onClick()
                    }}
                >{i}x</p>
            ))
        }</>
    }, [])

    const currentRepresentation = viewModel.current.currentRepresentation
    const currentSubtitlesLang = viewModel.current.currentSubtitlesLang
    const currentSpeed = viewModel.current.currentSpeed
    const subtitles = viewModel.current.subtitles

    return (<UIVideoPlayer 
        title={title}
        settingsProps={{
            Quality: Representations,
            currentQuality: currentRepresentation.replace("Auto", t("player.representationAuto")),
            Speed: Speed,
            currentSpeed: currentSpeed + "x",
            Subtitles: subtitles.length ? Subtitles : undefined,
            currentSubtitle: subtitles.length ? (currentSubtitlesLang ?? t("player.subtitlesOff")) : t("player.subtitlesNone"),
        }}
        refs={refs}
        viewModel={viewModel.current}
    />)
}