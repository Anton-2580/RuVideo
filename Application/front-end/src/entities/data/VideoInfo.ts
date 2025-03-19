import { ChannelInfo } from "./ChannelInfo"


interface VideoInfo {
    video: string
    dataTime: string
    photo: string | null
    title: string
    description: string
    channel: ChannelInfo
}

export type { VideoInfo };