import { useEffect, useRef, useState } from "react"
import { getDataObjects, PathsAPI, usePagination } from "@/shared"
import { VideoList } from "@/widgets/"
import type { VideoInfo } from "@/entities"
import type { ApiResultType, Result } from "@/shared/"
import { ResultType } from "@/shared/"
import menu_styles from "@/widgets/menu/menu.module.css"


export default function HomePage() {
    const countVideos = 9
    const get_data = useRef({
        "shorts": false,
        "videos": true,
    })
    const { results, isLoading } = elementPagination<VideoInfo>(
        PathsAPI.VIDEO_WITH_CHANNELS,
        ResultType.VIDEOS, countVideos,
        get_data.current.videos
    )

    return (<main id={menu_styles.content}>
        {
            results.map((result, index) => (
               <VideoList result={result} isLoading={isLoading} count={countVideos} key={index}/>
            ))
        }
    </main>)
}

function elementPagination<T>(
    path: PathsAPI,
    resultType: ResultType,
    count: number = 9,
    get_new_data: boolean = false,
) {
    const step = useRef(0)
    const [results, setResults] = useState<Result<T>[]>([])
    const { data, isLoading, isSuccess } = getDataObjects(path, step.current, count)
    
    const typedData = data as ApiResultType<T> | undefined

    useEffect(() => {
        if (typedData && isSuccess) {
            setResults(prev => ([ ...prev, { type: resultType, data: typedData } ]))
        }
    }, [isSuccess])

    usePagination(() => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100 
            && typedData?.next && get_new_data
        ) {
            step.current += count
        }
    })

    return {
        results,
        isLoading,
    }
}