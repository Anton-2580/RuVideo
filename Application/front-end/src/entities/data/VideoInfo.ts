import type { ChannelInfo } from "./ChannelInfo"


interface VideoInfo {
    video: string
    dataTime: string
    photo: string | null
    title: string
    description: string
    channel: ChannelInfo
    browsing: number
}

export type { VideoInfo };