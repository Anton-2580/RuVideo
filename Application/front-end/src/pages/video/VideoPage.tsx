import { useParams } from "react-router"
import { VideoPlayer } from "@/widgets"
import type { VideoInfo } from "@/entities"
import { PathsAPI, useOrdinaryQuery } from "@/shared"


export default function VideoPage() {
    const { slug } = useParams()
    const { data } = useOrdinaryQuery<VideoInfo>(PathsAPI.VIDEO_WITH_CHANNELS + slug + '/')

    return (<div>
        <VideoPlayer src={data?.video} title={data?.title} />
    </div>)
}
