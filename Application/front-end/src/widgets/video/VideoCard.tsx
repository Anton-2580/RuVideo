import { PropsWithChildren } from "react"
import { VideoInfo } from "@/entities"
import { NavigateImageButton, NavigateVideoButton, NavigateTextButton } from "@/shared"
import styles from "./video.module.css"


export type VideoCardProps = PropsWithChildren & {
    videoInfo: VideoInfo
}


export default function VideoCard({ videoInfo, ...props }: VideoCardProps) {
    return (<article className={styles.video_card} {...props} >
        <NavigateVideoButton to={videoInfo.video} videos={[videoInfo.video]} poster={videoInfo.photo ?? undefined} />
        
        <div className={styles.video_card_title} >
            <NavigateTextButton to={videoInfo.video} text={ videoInfo.title } />
            <MoreVideoInfo />
        </div>

        <div className={styles.video_card_channel}>
            <NavigateImageButton to={videoInfo.channel.name} image={videoInfo.channel.photo ?? ""} 
                imageStyle={{
                    borderRadius: "50%",
                    height: "2rem",
                }}/>
            <NavigateTextButton to={videoInfo.channel.name} text={videoInfo.channel.name} />
        </div>
        <NavigateTextButton to={videoInfo.video} text={new Date(parseFloat(videoInfo.dataTime) * 1000).toLocaleString()}/>
    </article>);
}


function MoreVideoInfo() {
    return (<ul className={styles.video_card_more_info} >
        <li></li>
        <li></li>
        <li></li>
    </ul>);
}
