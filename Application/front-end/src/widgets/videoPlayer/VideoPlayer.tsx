import { useCallback, useEffect, useRef } from "react"
import { useUserStore } from "@/entities"
import type { VideoInfoDetail } from "@/entities"
import { formats } from "@/entities"
import { PathsAPI, useOrdinaryQuery, type UserData } from "@/shared"
import { DashVideoPlayer } from "./dash"
import styles from "./videoPlayer.module.css"
import { PlayerRefs } from "./ViewModels"


export type VideoPlayerProps = {
    data: VideoInfoDetail | undefined
    title: string | undefined
}

export type SpecificVideoPlayerProps = {
    src: string
    title: string | undefined
    refs: PlayerRefs
}


export default function VideoPlayer({ data, title }: VideoPlayerProps) {
    const likestFormat = getLikestFormat()

    const videoContainer = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const seeLine = useRef<HTMLDivElement>(null)
    const playBtn = useRef<HTMLDivElement>(null)
    const dinamicBtn = useRef<HTMLDivElement>(null)
    const timeDisplay = useRef<HTMLDivElement>(null)
    const refs = useRef<PlayerRefs>({
        videoContainer,
        videoRef,
        seeLine,
        playBtn,
        dinamicBtn,
        timeDisplay,
    })

    const Player = useCallback(() => {
        if (!data)
            return <></>

        switch (likestFormat) {
            case formats.mpd: return <DashVideoPlayer src={data.mpd} title={title} refs={refs.current} />
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


