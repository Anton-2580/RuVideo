import type { MouseEvent } from "react"
import type { PlayerState } from "./types"


export type SpecificPlayerState = PlayerState & {
    interval: NodeJS.Timeout | null
    update: () => void
    startStateInterval: () => void
    clearStateInterval: () => void
    finishChangeTime: (event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => void
    setDisplayTime: () => void

    setMute: () => void
}