import { useCallback, useEffect, useRef } from "react"
import { useUIPlayerStore, useUserStore } from "@/entities"
import { PathsAPI, useOrdinaryQuery, type UserData } from "@/shared"
import { formats } from "./formats"
import { DashVideoPlayer } from "./dash"
import styles from "./videoPlayer.module.css"


export type VideoPlayerProps = {
    src: string | undefined
    title: string | undefined
}

export type SpecificVideoPlayerProps = {
    src: string | undefined
    title: string | undefined
}


export default function VideoPlayer({src, title}: VideoPlayerProps) {
    const likestFormat = getLikestFormat()
    const path = src ? getVideoPath(likestFormat, src) : undefined

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
        if (!path)
            return <></>

        switch (likestFormat) {
            case formats.mpd: return <DashVideoPlayer src={path} title={title} />
            case formats.m3u8: return <></>
            default: return <></>
        }
    }, [likestFormat, path])

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

function getVideoPath(likestFormat: string, path: string) {
    const index = path.indexOf("original")

    const name = path.slice(index + 9).split(".")[0]
    path = path.slice(0, index)

    return `${path}/${likestFormat}/${name}/${name}.${likestFormat}`
}