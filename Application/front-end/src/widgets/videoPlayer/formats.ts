export const formats = {
    mpd: "mpd",
    m3u8: "m3u8",
    mp4: "mp4",
} as const
export type formats = (typeof formats)[keyof typeof formats]
