import type { DragEvent, MouseEvent, RefObject } from "react"
import type { TextTracksAddedEvent } from "dashjs"

export type click<T> = MouseEvent<T, globalThis.MouseEvent>

export type PlayerRefs = {
    videoContainer: RefObject<HTMLDivElement | null>
    videoRef: RefObject<HTMLVideoElement | null>
    seeLine: RefObject<HTMLDivElement | null>
    playBtn: RefObject<HTMLDivElement | null>
    dinamicBtn: RefObject<HTMLDivElement | null>
    timeDisplay: RefObject<HTMLDivElement | null>
}

export type ActiveStyles = {
    play: string
}
type newVolume = number


export interface BasePlayerViewModel {
    refs: PlayerRefs
    isFullScreen: boolean
    ActiveStyles: ActiveStyles

    setPlay(): void
    changeTime(event: click<HTMLSpanElement>): void
    setIndicatorLine(percent: number, indicator: HTMLDivElement): void
    finishChangeTime(event: click<HTMLSpanElement>): void
    changeMute(event: click<HTMLSpanElement>): newVolume | undefined
    setMute(event: click<HTMLDivElement>, isMuted?: boolean): void
    setFullScreen(): void

    onClickButtonPrev: () => void
    onClickButtonNext: () => void
    onMouseMove?: (event: DragEvent<HTMLElement>) => void
}


export interface SpecificPlayerViewModel<TextTrackInfo, Representation> extends BasePlayerViewModel {
    subtitles: TextTrackInfo[]
    representations: Representation[]
    currentRepresentation: string
    currentSubtitlesLang: string | null
    currentSpeed: number

    setOnListeners(): void
    setOffListeners(): void

    bufferLevelUpdated(): void
    playbackStarted(): void
    playbackPaused(): void
    playbackRateChanged(): void
    qualityChangeRequested(): void
    updateCurrentSubtitlesLang(): void
    allTextTracksAdded(e: TextTracksAddedEvent): void
    streamActivated(): void

    update: () => void
    startInterval: () => void
    clearInterval: () => void
    setTime: (percent: number) => void

    updateCurrentSubtitlesLang: () => void
}
