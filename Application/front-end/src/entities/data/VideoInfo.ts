import type { ChannelInfo } from "./ChannelInfo"


export interface VideoInfo {
    id: number
    slug: string
    video: string
    dataTime: number
    photo: string | null
    title: string
    description: string
    channel: ChannelInfo
    browsing: number
}

export interface VideoInfoDetail extends VideoInfo {
    mpd: string
    m3u8: string
    rewind_frames: string
}
