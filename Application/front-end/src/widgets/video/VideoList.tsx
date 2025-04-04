import type { VideoInfo } from "@/entities"
import type { ApiResultType, Result } from "@/shared/"
import styles from "./video.module.css"
import VideoCard, { VideoLoader } from "./VideoCard"


type VideoListProps = {
    result: Result<VideoInfo>
    isLoading: boolean
    count: number
}


export default function VideoList({
    result: {data, type},
    isLoading,
    count,
}: VideoListProps) {
    if (isLoading) {
        return (
            <div>
                {
                    Array(count).map(() => (
                        <VideoLoader />
                    ))
                }
            </div>
        )
    }

    return (<section className={styles.video_list}>
        {
            data.results.map((video) => (
                <VideoCard key={video.id} videoInfo={video} />
            ))
        }
    </section>)
}