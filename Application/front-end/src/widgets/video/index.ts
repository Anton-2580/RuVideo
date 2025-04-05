import { lazy } from "react"

const VideoCard = lazy(() => import("./VideoCard"))
const VideoList = lazy(() => import("./VideoList"))

export {
    VideoCard,
    VideoList,
}