export const Paths = {
    HOME: "/",
    SEARCH: "/serach/",
    LOGIN: "/login/",
    LOGOUT: "/logout/",
    REGISTRATION: "/registration/",
    SETTINGS: "/settings/",
    ADD_CONTENT: "/add_content/",
    NOTIFICATIONS: "/notifications/",
    SHORTS: "/shorts/",
    SUBSCRIBES: "/subscribes/",
    TRANSLATIONS: "/translations/",
    CHANNEL: "/channel/",
    HISTORY: "/history/",
    YOUR_VIDEOS: "/your_videos/",
    SEE_LATER: "/see_later/",
    LIKES: "/likes/",
} as const
export type Paths = (typeof Paths)[keyof typeof Paths]
