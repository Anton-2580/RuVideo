import type { DetailedHTMLProps, ImgHTMLAttributes, DragEvent, MouseEvent, JSX, RefObject } from "react"
import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { arrow, fullscreen_btn, fullscreen_btn_1, settings, speaker, speaker_1, speaker_2 } from "@/shared/img"
import { useUIPlayerStore } from "@/entities"
import styles from "./uicontrollbar.module.css"


export type UIVideoPlayerProps = {
    title: string | undefined
    settingsProps: SettingsBtnProps
    setMute?: () => void
    setPlay?: (style: string) => void
    changeTime?: (event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => void
    finishChangeTime?: (event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => void
    changeMute?: (event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => void
    onClickButtonNext?: () => void
    onClickButtonPrev?: () => void
    setFullScreen?: () => void
    onMouseMove?: (event: DragEvent<HTMLElement>) => void
}

export default function UIVideoPlayer({ 
    title,
    setMute, setPlay,
    changeTime, finishChangeTime, 
    changeMute,
    onClickButtonNext, onClickButtonPrev,
    setFullScreen, 
    onMouseMove,
    settingsProps,
}: UIVideoPlayerProps) {
    const refs = useUIPlayerStore(state => state.refs)
    const setActiveStyles = useUIPlayerStore(state => state.setActiveStyles)

    useEffect(() => {
        setActiveStyles(activeStyles => ({ 
            ...activeStyles,
            play: styles.PlayPauseBtnActive,
        }))
    }, [])

    if (!refs)
        return

    return (<article className={styles.videoContainer} ref={refs.videoContainer} 
        onMouseMove={onMouseMove}
    >
        <video
            className={styles.videoPlayer}
            slot="media"
            ref={refs.videoRef}
            autoPlay
        />
        <div className={styles.videoController} > 
            <div className={styles.SeeLine} ref={refs.seeLine} >
                <span className={styles.seeLine} onDrag={changeTime} onClick={changeTime} onMouseUp={finishChangeTime} onDragEnd={finishChangeTime} />
                <span className={styles.sawLine} onDrag={changeTime} onClick={changeTime} onMouseUp={finishChangeTime} onDragEnd={finishChangeTime} />
                <span className={styles.linePoint} />
                <span className={styles.loadedLine} onDrag={changeTime} onClick={changeTime} onMouseUp={finishChangeTime} onDragEnd={finishChangeTime} />
            </div>
            
            <div className={styles.videoControllerBtns} >
                <div className={styles.PlayPauseBtn} 
                    ref={refs.playBtn} onClickCapture={() => {
                        if (setPlay) setPlay(styles.PlayPauseBtnActive)
                    }}
                >
                    <span className={styles.Play1} />
                    <span className={styles.Play2} />
                    <span className={styles.Play3} />
                </div>

                <div className={styles.PlayPrevBtn} onCanPlayCapture={onClickButtonPrev ?? (() => {})} >
                    <span className={styles.Play1} />
                    <span className={styles.Play2} />
                    <span className={styles.Play3} />
                    <span className={styles.PlayPrev1} />
                </div>

                <div className={styles.PlayNextBtn} onCanPlayCapture={onClickButtonNext ?? (() => {})} >
                    <span className={styles.Play1} />
                    <span className={styles.Play2} />
                    <span className={styles.Play3} />
                    <span className={styles.PlayNext1} />
                </div>

                <div className={styles.dinamicBtn} ref={refs.dinamicBtn} >
                    <div className={styles.muteBtn} onClick={setMute}>
                        <img loading="lazy" src={speaker} className={styles.speaker}  alt="speaker" />
                        <img loading="lazy" src={speaker_1} className={styles.speaker_1}  alt="speaker" />
                        <img loading="lazy" src={speaker_2} className={styles.speaker_2}  alt="speaker" />
                    </div>
                    <div className={styles.dinamicIndicator} >
                        <span className={styles.seeLine} onDrag={changeMute} onClick={changeMute} />
                        <span className={styles.sawLine} onDrag={changeMute} onClick={changeMute} />
                        <span className={styles.linePoint} />
                    </div>
                </div>

                <div className={styles.timeDisplay} ref={refs.timeDisplay} >
                    <span className={styles.timeDisplay}>00:00</span>
                    <span>/</span>
                    <span className={styles.totalTime}>00:00</span>
                </div>

                <div style={{ flexGrow: 1 }}/>

                <SettingsBtn {...settingsProps} />

                <FullScreen loading="lazy" src={fullscreen_btn} alt="fullscreen"
                    className={styles.fullScreenBtn} onClickCapture={setFullScreen} />

            </div>
        </div>
    </article>)
}

export type SettingsOpenItemProps = {
    onClick?: () => void
}

type SettingsBtnProps = {
    Quality?: (props: SettingsOpenItemProps) => (JSX.Element | undefined)
    currentQuality?: string
    Speed?: (props: SettingsOpenItemProps) => (JSX.Element | undefined)
    currentSpeed?: string
    Subtitles?: (props: SettingsOpenItemProps) => (JSX.Element | undefined)
    currentSubtitle?: string
}

function SettingsBtn({
    Quality,
    currentQuality,
    Speed,
    currentSpeed,
    Subtitles,
    currentSubtitle,
}: SettingsBtnProps) {
    const settingsBtn = useRef<HTMLDivElement>(null)
    const isClicked = useRef(false)

    const { t } = useTranslation()

    const titles = [
        t("player.quality"),
        t("player.speed"),
        t("player.subtitles"),
    ]
    const refs = [
        useRef(null),
        useRef(null),
        useRef(null),
    ]
    const innerSettings = useRef<HTMLDivElement>(null)

    return (
        <div className={styles.settingsBtn} ref={settingsBtn}>
            <img loading="lazy" src={settings} alt="settings" 
                style={{ filter: "invert(1)" }} 
                onClickCapture={() => {
                    if (!settingsBtn.current)
                        return
                    
                    (settingsBtn.current.children[0] as HTMLImageElement).style.transform = 
                        isClicked.current ? "rotate(0deg)" : "rotate(90deg)";

                    const settings = (settingsBtn.current.children[1] as HTMLDivElement)
                    settings.style.scale = settings.style.scale == '1' ? '0' : '1';

                    isClicked.current = !isClicked.current
                }}
            />

            <div className={styles.settings} style={{ scale: 0 }} >
                <div className={styles.inner_settings} ref={innerSettings}>
                    <SettingsItem h6={titles[0]} openItemRef={refs[0]} innerSettingsRef={innerSettings} p={currentQuality ?? ""} />
                    <SettingsItem h6={titles[1]} openItemRef={refs[1]} innerSettingsRef={innerSettings} p={currentSpeed ?? ""}   />
                    <SettingsItem h6={titles[2]} openItemRef={refs[2]} innerSettingsRef={innerSettings} p={currentSubtitle ??""} />
                </div>

                {
                    [Quality, Speed, Subtitles].map((Item, index) => {
                        if (!Item)
                            return undefined

                        return <div className={styles.settings_item_open} style={{
                            scale: 0,
                            opacity: 0,
                        }} ref={refs[index]} key={index} >
                            <div className={styles.settings_item_open_header} >
                                <img loading="lazy" src={arrow} alt="exit" style={{ transform: "rotate(180deg)",  height: "0.7rem" }} 
                                    onClickCapture={() => OpenCloseItem(refs[index], innerSettings)}
                                />
                                <h6>{titles[index]}</h6>
                            </div>
                            <Item onClick={() => OpenCloseItem(refs[index], innerSettings)} />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

type SettingsItemProps = {
    h6: string
    p: string
    openItemRef: RefObject<HTMLDivElement | null>
    innerSettingsRef: RefObject<HTMLDivElement | null>
}

function SettingsItem({openItemRef, innerSettingsRef, ...props}: SettingsItemProps) {
    return (<>
        <div className={styles.settings_item} onClickCapture={() => OpenCloseItem(openItemRef, innerSettingsRef)}>
            <h6>{props.h6}</h6>
            <p>{props.p}</p>
            <img loading="lazy" src={arrow} alt="" />
        </div>
    </>)
}

function OpenCloseItem(
    openItemRef: RefObject<HTMLDivElement | null>,
    innerSettingsRef: RefObject<HTMLDivElement | null>
) {
    if (!openItemRef.current || !innerSettingsRef.current)
        return

    if (openItemRef.current.style.scale == '1') {
        openItemRef.current.style.scale = '0'
        openItemRef.current.style.opacity = '0'
        innerSettingsRef.current.style.scale = '1'
        innerSettingsRef.current.style.opacity = '1'
    } else {
        openItemRef.current.style.scale = '1'
        openItemRef.current.style.opacity = '1'
        innerSettingsRef.current.style.scale = '0'
        innerSettingsRef.current.style.opacity = '0'
    }
}


function FullScreen(props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
    const imgRef = useRef<HTMLImageElement>(null)
    const src = useRef(fullscreen_btn)

    return <img {...props} ref={imgRef} src={src.current} onClick={() => {
        if (imgRef.current) {
            src.current = src.current == fullscreen_btn ? fullscreen_btn_1 : fullscreen_btn
            imgRef.current.src = src.current
        }
    }} />
}