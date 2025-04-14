export const formats = {
    mpd: "mpd",
    m3u8: "m3u8",
    mp4: "mp4",
} as const
export type formats = (typeof formats)[keyof typeof formats]


export type SubmitData = {
    username: string
    password?: string
    password1?: string
    password2?: string
    email: string
}

export type UserState = {
    isLogined: boolean
    logining: boolean
    likestFormat: formats
    setIsLogined: (isLogined: boolean) => void
    setLogining: (logining: boolean) => void
    setState: (state: UserState | Object) => void
}
