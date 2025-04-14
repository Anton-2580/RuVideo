import type { CSSProperties, RefObject } from "react";
import { Link, type LinkProps } from "react-router";


type NavigateImageButtonProps = LinkProps & {
    image: string
    alt?: string
    imageClassName?: string
    height?: string
    imageStyle?: CSSProperties
}

type NavigateTextButtonProps = LinkProps & {
    text: string
    style?: CSSProperties
}

type NavigateVideoButtonProps = LinkProps & {
    videos: Array<string>
    videoClassName?: string
    poster?: string
    videoRef?: RefObject<HTMLVideoElement | null>
}


export function NavigateImageButton({ to, image, imageClassName, height, imageStyle, alt, ...props }: NavigateImageButtonProps) {
    return (<Link to={to} {...props}>
        <img src={image} alt={alt} style={{ height, ...imageStyle }} className={imageClassName}/>
    </Link>)
}

export function NavigateTextButton({ to, text, style, ...props }: NavigateTextButtonProps) {
    return (<Link to={to} {...props} style={ style }>
        <p>{ text }</p>
    </Link>)
}

export function NavigateVideoButton({ to, videos, poster, videoClassName, videoRef, ...props }: NavigateVideoButtonProps) {
    return (<Link to={to} {...props}>
        <video poster={poster} className={videoClassName} ref={videoRef} >
            {videos.map(video =>
                <source src={video} key={video}/>
            )}
        </video>
    </Link>)
}
