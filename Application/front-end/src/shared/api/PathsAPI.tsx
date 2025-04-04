export const PathsAPI = {
    CHANNEL: "/api/Channel/",
    VIDEO: "/api/Video/",
    VIDEO_WITH_CHANNELS: "/api/VideoWithChannels/",
    HASHTAG: "/api/Hashtag/",
    RATING: "/api/Rating/",
    SUBSCRIBE: "/api/Subscribe/",
    NOTIFICATION: "/api/Notification/",

    REGISTRATION: "/api/registration/",
    LOGIN: "/api/auth/login/",
    LOGOUT: "/api/auth/logout/",
    USER_DATA: "/api/auth/user/",
} as const
export type PathsAPI = (typeof PathsAPI)[keyof typeof PathsAPI]

export const Pagination = {
    SKIP: "offset",
    LIMIT: "limit",
} as const
export type Pagination = (typeof Pagination)[keyof typeof Pagination]
