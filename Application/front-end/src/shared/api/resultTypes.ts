export const ResultType = {
    VIDEOS: "videos",
    SHORTS: "shorts",
} as const
export type ResultType = (typeof ResultType)[keyof typeof ResultType]


export type ApiResultType<T> = {
    count: number
    next: string | null
    previous: string | null
    results: Array<T>
}

export type Result<T> = {
    type: ResultType
    data: ApiResultType<T>
}