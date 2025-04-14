import { useCallback, useEffect, useRef } from "react"
import { useUIPlayerStore, useUserStore } from "@/entities"
import type { VideoInfoDetail } from "@/entities"
import { formats } from "@/entities"
import { PathsAPI, useOrdinaryQuery, type UserData } from "@/shared"
import { DashVideoPlayer } from "./dash"
import styles from "./videoPlayer.module.css"


export type VideoPlayerProps = {
    data: VideoInfoDetail | undefined
    title: string | undefined
}

export type SpecificVideoPlayerProps = {
    src: string | undefined
    title: string | undefined
}


export default function VideoPlayer({ data, title }: VideoPlayerProps) {
    const likestFormat = getLikestFormat()

    const setRefs = useUIPlayerStore(state => state.setRefs)
    const videoContainer = useRef(null)
    const videoRef = useRef(null)
    const seeLine = useRef(null)
    const playBtn = useRef(null)
    const dinamicBtn = useRef(null)
    const timeDisplay = useRef(null)
    
    useEffect(() => {
        setRefs({
            videoContainer,
            videoRef,
            seeLine,
            playBtn,
            dinamicBtn,
            timeDisplay,
        })
    }, [])

    const Player = useCallback(() => {
        if (!data)
            return <></>

        switch (likestFormat) {
            case formats.mpd: return <DashVideoPlayer src={data.mpd} title={title} />
            case formats.m3u8: return <></>
            default: return <></>
        }
    }, [likestFormat, data])

    return (<div id={ styles.video_player }>
        <Player />
    </div>)
}


function getLikestFormat() {
    const likestFormat = useUserStore(state => state.likestFormat)
    
    if (!likestFormat) {
        const newLikestFormat = useOrdinaryQuery<UserData>(PathsAPI.USER_DATA).data?.likest_format

        if (newLikestFormat) {
            useUserStore(state => state.setState)({ likestFormat: newLikestFormat })
        }
    }

    return likestFormat
}


