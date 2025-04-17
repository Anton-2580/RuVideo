import type { DragEvent } from "react"
import type { ActiveStyles, PlayerRefs, click } from "./types"
import { BasePlayerViewModel } from "./types"


export class PlayerImpl implements BasePlayerViewModel {
    protected lastVolumeOpacity: [string, string] = ['1', '1']
    protected lastVolume = 0.5
    protected timeouts: {[key: string]: NodeJS.Timeout | undefined} = {}
    isFullScreen = false

    refs: PlayerRefs
    ActiveStyles: ActiveStyles
    constructor (refs: PlayerRefs, ActiveStyles: ActiveStyles) {
        this.refs = refs
        this.ActiveStyles = ActiveStyles
    }
    
    onMouseMove(event: DragEvent<HTMLElement>) {
        clearTimeout(this.timeouts.drag)
        if (!this.refs.videoContainer.current)
            return

        const videoControllers = this.refs.videoContainer.current.children[1] as HTMLDivElement
        videoControllers.style.opacity = '1'
        document.documentElement.style.cursor = "auto"

        this.timeouts.drag = setTimeout(() => {
            videoControllers.style.opacity = '0'

            if (this.isFullScreen)
                document.documentElement.style.cursor = "none"
        }, 4000)
    }


    setFullScreen() {
        const refs = this.refs
        if (!refs.videoContainer.current) 
            return

        if (!document.fullscreenElement) {
            this.isFullScreen = true
            refs.videoContainer.current.requestFullscreen()
        } else {
            this.isFullScreen = false
            document.exitFullscreen()
        }
    }

    setMute(event: click<HTMLDivElement>, isMuted: boolean) {
        const refs = this.refs
        if (!refs.dinamicBtn.current) 
            return

        const images = refs.dinamicBtn.current.children[0].children as HTMLCollectionOf<HTMLImageElement>
        const lastVolumeOpacity = this.lastVolumeOpacity
        if (isMuted) {
            lastVolumeOpacity[0] = images[1].style.opacity
            lastVolumeOpacity[1] = images[2].style.opacity
            images[1].style.opacity = '0'
            images[2].style.opacity = '0'
        } else {
            images[1].style.opacity = lastVolumeOpacity[0]
            images[2].style.opacity = lastVolumeOpacity[1]
        }
    }

    setPlay() {
        const refs = this.refs
        const activeStyle = this.ActiveStyles.play

        if (!refs.playBtn.current) 
            return

        if (refs.playBtn.current.className.includes(activeStyle)) {
            refs.playBtn.current.className = refs.playBtn.current.className.replace(' ' + activeStyle, '')
        } else {
            refs.playBtn.current.className += ' ' + activeStyle
        }
    }

    changeTime(event: click<HTMLSpanElement>) {
        const refs = this.refs

        if (refs.seeLine.current && event.nativeEvent.offsetX >= 0 && event.nativeEvent.offsetX <= refs.seeLine.current.offsetWidth) {
            const percent = event.nativeEvent.offsetX / refs.seeLine.current.offsetWidth * 100
            this.setIndicatorLine(percent, refs.seeLine.current)
        }
    }
    setIndicatorLine(percent: number, indicator: HTMLDivElement) {
        const spans = indicator.children as HTMLCollectionOf<HTMLSpanElement>

        spans[1].style.width = `${percent}%`
        spans[2].style.left = `${percent}%`
    }

    changeMute(event: click<HTMLSpanElement>) {
        const refs = this.refs 
        if (!refs.dinamicBtn.current) 
            return undefined
        
        const indicator = refs.dinamicBtn.current.children[1] as HTMLDivElement

        if (!(event.nativeEvent.offsetX >= 0 && event.nativeEvent.offsetX <= indicator.offsetWidth))
            return undefined
        
        const images = refs.dinamicBtn.current.children[0].children as HTMLCollectionOf<HTMLImageElement>

        const newVolume = event.nativeEvent.offsetX / indicator.offsetWidth
        this.setIndicatorLine(newVolume * 100, indicator)

        if (newVolume == 0) {
            images[1].style.opacity = '0'
            images[2].style.opacity = '0'
        } else {
            images[1].style.opacity = '1'
            images[2].style.opacity = newVolume >= 0.5 ? '1' : '0'
        }

        return newVolume
    }

    finishChangeTime(event: click<HTMLSpanElement>) {}
    onClickButtonPrev() {}
    onClickButtonNext() {}
}
