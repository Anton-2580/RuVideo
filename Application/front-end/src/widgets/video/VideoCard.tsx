import type { CSSProperties, RefObject } from "react"
import { useRef, useState } from "react"
import { Link } from "react-router"
import { useTranslation } from "react-i18next"
import { ColorVars } from "@/app/styles/ColorVars"
import type { VideoInfo } from "@/entities"
import { NavigateVideoButton, NavigateTextButton, useOnClickOnside, Paths } from "@/shared"
import { isEquals } from "@/shared/util/functions"
import { domAnimation, LazyMotion, motion } from "@/shared/util/lazyLibraries/motion"
import type { HTMLMotionProps, MotionStyle } from "motion/dist/react"

import styles from "./video.module.css"
import { default_user } from "@/shared/img"


export type VideoCardProps = HTMLMotionProps<"article"> & {
    videoInfo?: VideoInfo
    style?: CSSProperties
    videoRef?: RefObject<HTMLVideoElement | null>
}


export default function VideoCard({ videoInfo, videoRef, ...props }: VideoCardProps) {
    if (videoInfo === null || videoInfo === undefined)
        return <VideoLoader />

    const { t } = useTranslation();

    const oldShow = useRef({clickCard: true, moreInfo: false})
    const show = useRef({clickCard: true, moreInfo: false})
    const [showState, setShowState] = useState({clickCard: true, moreInfo: false})

    const channelRef = useRef<HTMLAnchorElement>(null)
    const moreInfoRef = useRef<HTMLDivElement>(null)
    const moreInfoButtonRef = useRef<HTMLUListElement>(null)
    const lazyMotionRef = useRef<HTMLElement>(null)

    useOnClickOnside(event => {        
        const target = event.target as Node | null
        
        if (lazyMotionRef.current?.contains(target)) {
            show.current.clickCard = true
        }
        
        if (moreInfoRef.current?.contains(target)) {
            show.current.moreInfo = true
        } else if (moreInfoButtonRef.current?.contains(target)) {
            show.current.moreInfo = !show.current.moreInfo
            show.current.clickCard = false
        } else {
            show.current.moreInfo = false
        }

        if (channelRef.current?.contains(target)) {
            show.current.clickCard = false
            show.current.moreInfo = false
        }

        if (!isEquals(oldShow.current, show.current)) {
            oldShow.current = {...show.current}
            setShowState({...show.current})
        }
    }, [moreInfoRef, lazyMotionRef, moreInfoButtonRef])

    const slug = Paths.VIDEOS + videoInfo.slug + '/'
    const channel_slug = Paths.CHANNEL + videoInfo.channel.name + '/'

    const moreInfoStyle: MotionStyle = {}
    if (moreInfoRef.current &&
        (moreInfoRef.current.getBoundingClientRect().right + moreInfoRef.current.offsetWidth + 32) <= window.innerWidth
    ) {
        moreInfoStyle.left = "32px"
    } else {
        moreInfoStyle.right = "32px"
    }

    return (<LazyMotion features={domAnimation}><motion.article className={styles.video_card} {...props} ref={lazyMotionRef}
        whileTap={{ 
            scale: showState.clickCard ? 0.95 : undefined,
            backgroundColor: showState.clickCard ? `var(${ColorVars.videoHoverColor})` : undefined,
        }}
    >
        <NavigateVideoButton to={slug} videos={[videoInfo.video]} poster={videoInfo.photo ?? undefined} videoRef={videoRef} />
        
        <div className={styles.video_card_title} >
            <NavigateTextButton to={slug} text={ videoInfo.title } />
            <motion.ul className={styles.video_card_more_info_button} ref={moreInfoButtonRef}
                whileTap={{
                    scale: 0.9,
                    backgroundColor: `var(${ColorVars.videoHoverColor})`,
                }}
            >
                <li /><li /><li />
                <motion.div className={styles.video_card_more_info} initial={{  scale: 0 }} ref={moreInfoRef}
                    animate={{
                        scale: showState.moreInfo ? 1 : 0,
                        opacity: showState.moreInfo ? 1 : 0,
                    }}
                    style={moreInfoStyle}
                    onPointerDownCapture={e => e.stopPropagation()}
                >
                    <p>adasdsada</p>
                </motion.div>
            </motion.ul>
        </div>

        <Link to={channel_slug} className={styles.video_card_channel} ref={channelRef}>
            <img alt="channel image" loading="lazy" src={videoInfo.channel.photo ?? default_user} 
                style={{
                    borderRadius: "50%",
                    height: "2rem",
                }}/>
            <p>{videoInfo.channel.name} </p>
        </Link>

        <Link to={slug} className={ styles.video_card_info }>
            <p>{ t("browsing", { count: videoInfo.browsing }) }</p>
            <p>{ t("date.date_ago", { date: videoInfo.dataTime }) }</p>
        </Link>
    </motion.article></LazyMotion>);
}


export function VideoLoader() {
    return (
    <div className={ styles.ghost_video_card } >
        <div className={styles.ghost_video} />
        <div className={styles.ghost_details} >
            <div className={styles.ghost_channel_avatar} />
            <div className={styles.ghost_video_info} >
                <div className={styles.ghost_title} />
                <div className={styles.ghost_meta} />
          </div>
        </div>
    </div>
    )
}
