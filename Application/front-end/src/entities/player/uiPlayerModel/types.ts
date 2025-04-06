import type { PlayerRefs, PlayerState } from "../types"


type UIPlayerState = PlayerState & {
    refs?: PlayerRefs
    setFullScreen: () => void
    setMute: (isMuted: boolean) => void
    lastVolumeOpacity: [string, string]
}