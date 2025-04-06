import type { RefObject, MouseEvent, DragEvent } from "react"


export type PlayerRefs = {
    videoContainer: RefObject<HTMLDivElement | null>
    videoRef: RefObject<HTMLVideoElement | null>
    seeLine: RefObject<HTMLDivElement | null>
    playBtn: RefObject<HTMLDivElement | null>
    dinamicBtn: RefObject<HTMLDivElement | null>
    timeDisplay: RefObject<HTMLDivElement | null>
}

export type PlayerState = {
    getRefs: () => PlayerRefs | undefined
    setRefs: (refs: PlayerRefs) => void

    onMouseMove: (event: DragEvent<HTMLElement>) => void

    setFullScreen: () => void
    setPlay: () => void
    changeTime: (event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => void
    changeMute: (event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => newVolume | void

    timeouts?: {[key: string]: NodeJS.Timeout}
}

type newVolume = number
