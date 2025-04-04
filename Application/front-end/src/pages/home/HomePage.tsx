import { useEffect, useRef, useState } from "react"
import { getDataObjects, PathsAPI } from "@/shared"
import { VideoList } from "@/widgets/"
import type { VideoInfo } from "@/entities"
import type { Result } from "@/shared/"
import { ResultType } from "@/shared/"


export default function HomePage() {
    const count = 9
    const videos = useRef(0)
    const [results, setResults] = useState<Result<VideoInfo>[]>([])
    const { data, isLoading, isSuccess } = getDataObjects(PathsAPI.VIDEO_WITH_CHANNELS, videos.current, count)
    const lastData = useRef<typeof data>(undefined)

    useEffect(() => {
        if (isSuccess) {
            if (lastData.current == data) return
            
            lastData.current = data
            videos.current += count
            setResults(prev => ([ ...prev, { type: ResultType.VIDEOS, data } as Result<VideoInfo> ]))
        }
    }, [isSuccess])

    return (<main>
        {
            results.map((result, index) => (
               <VideoList result={result} isLoading={isLoading} count={count} key={index}/>
            ))
        }
    </main>)
}
