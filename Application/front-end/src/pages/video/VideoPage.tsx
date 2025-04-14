import { useParams } from "react-router"
import { VideoPlayer } from "@/widgets"
import type { VideoInfoDetail } from "@/entities"
import { PathsAPI, useOrdinaryQuery } from "@/shared"


export default function VideoPage() {
    const { slug } = useParams()
    const { data } = useOrdinaryQuery<VideoInfoDetail>(PathsAPI.VIDEO_WITH_CHANNELS + slug + '/')

    return (<div>
        <VideoPlayer data={data} title={data?.title} />
    </div>)
}
