import type { DragEvent, MouseEvent } from "react"
import type { TextTracksAddedEvent, MediaPlayerClass, Representation, TextTrackInfo } from "dashjs"
import { MediaPlayer } from "dashjs"
// import { MediaPlayer } from "dashjs/dist/modern/esm/dash.mediaplayer.min.js"  // how do this
import type { PlayerRefs, ActiveStyles, click } from "./types"
import { SpecificPlayerViewModel } from "./types"
import { PlayerImpl } from "./BasePlayerViewModel"
import autoBind from "auto-bind"


export class DashPlayerViewModel extends PlayerImpl implements SpecificPlayerViewModel<TextTrackInfo, Representation> {
    player: MediaPlayerClass

    subtitles: TextTrackInfo[] = []
    representations: Representation[] = []
    currentRepresentation = ""
    currentSubtitlesLang: string | null = null
    currentSpeed = 1

    constructor(
        refs: PlayerRefs,
        ActiveStyles: ActiveStyles,
    ) {
        super(refs, ActiveStyles)
        this.player = MediaPlayer().create()

        autoBind(this)
    }

    startInterval() {
        if (this.timeouts.dashInterval !== undefined)
            return
    
        this.update()
        this.timeouts.dashInterval = setInterval(this.update, 200)
    }

    clearInterval() {
        if (this.timeouts.dashInterval !== undefined)
            clearInterval(this.timeouts.dashInterval)
    
        this.timeouts.dashInterval = undefined
    }

    update() {
        const refs = this.refs
    
        if (!refs.timeDisplay.current)
            return
    
        if (this.player.isPaused()) 
            return this.clearInterval()
    
        const percent = this.player.time() / this.player.duration() * 100
        this.setTime(percent)
    }

    setTime(percent: number) {
        const refs = this.refs
    
        if (!refs.timeDisplay.current || !refs.seeLine.current) 
            return
    
        const timeSpans = refs.timeDisplay.current.children as HTMLCollectionOf<HTMLSpanElement>
        timeSpans[0].textContent = this.player.convertToTimeCode(this.player.time())

        this.setIndicatorLine(percent, refs.seeLine.current)
    }


    setOnListeners() {
        this.player.on("playbackStarted", this.playbackStarted)
        this.player.on("playbackPaused", this.playbackPaused)
        this.player.on("bufferLevelUpdated", this.bufferLevelUpdated)
        this.player.on("streamActivated", this.streamActivated)
        this.player.on("allTextTracksAdded", this.allTextTracksAdded)
        this.player.on("playbackRateChanged", this.playbackRateChanged)
        this.player.on("qualityChangeRequested", this.qualityChangeRequested)
    }

    setOffListeners() {
        this.player.off("playbackStarted", this.playbackStarted)
        this.player.off("playbackPaused", this.playbackPaused)
        this.player.off("bufferLevelUpdated", this.bufferLevelUpdated)
        this.player.off("streamActivated", this.streamActivated)
        this.player.off("allTextTracksAdded", this.allTextTracksAdded)
        this.player.off("playbackRateChanged", this.playbackRateChanged)
        this.player.off("qualityChangeRequested", this.qualityChangeRequested)
    }


    playbackStarted() {
        super.setPlay()
        this.startInterval()
    }

    playbackPaused() {
        super.setPlay()
        this.clearInterval()
    }

    bufferLevelUpdated() {
        const lineSpans = this.refs.seeLine.current?.children as HTMLCollectionOf<HTMLSpanElement>
        if (!lineSpans)
            return
    
        const dashMetrics = this.player.getDashMetrics()
        let bufferLevel = 0;
        if (dashMetrics) {
          bufferLevel = dashMetrics.getCurrentBufferLevel("video")
          if (!bufferLevel) {
            bufferLevel = dashMetrics.getCurrentBufferLevel("audio")
          }
        }
    
        lineSpans[3].style.left = `${this.player.time() / this.player.duration() * 100}%`
        lineSpans[3].style.width = `${bufferLevel / this.player.duration() * 100}%`
    }

    streamActivated() {    
        this.qualityChangeRequested()
        
        this.currentSubtitlesLang = this.subtitles[this.player.getCurrentTextTrackIndex()]?.lang
        this.representations = this.player.getRepresentationsByType("video")
        this.currentSpeed = this.player.getPlaybackRate()
    }

    allTextTracksAdded(event: TextTracksAddedEvent) {
        this.subtitles = event.tracks
    }

    playbackRateChanged() {
        this.currentSpeed = this.player.getPlaybackRate() ?? 1
    }

    qualityChangeRequested() {
        const height = this.player?.getCurrentRepresentationForType("video")?.height

        if (this.player.getSettings().streaming?.abr?.autoSwitchBitrate?.video) {
            this.currentRepresentation = `Auto(${height})p`
            return 
        }
    
        this.currentRepresentation = height + 'p'
    }


    updateCurrentSubtitlesLang() {
        this.currentSubtitlesLang = this.subtitles[this.player?.getCurrentTextTrackIndex() ?? -1]?.lang
    }


    onMouseMove(event: DragEvent<HTMLElement>) {
        clearTimeout(this.timeouts.dashDrag)
        if (this.timeouts.dashInterval === undefined && !this.player.isPaused())
            this.startInterval()
        
        super.onMouseMove(event)
        this.timeouts.dashDrag = setTimeout(() => {
            this.clearInterval()
        }, 4500)
    }


    
    finishChangeTime(event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) {
        this.changeTime(event)
    
        const refs = this.refs
    
        if (!refs?.seeLine.current || !refs?.timeDisplay.current)
            return

        const percent = (refs.seeLine.current.children as HTMLCollectionOf<HTMLSpanElement>)[1].style.width
        const number_percent = Number(percent.replace('%', ''))
        const time = number_percent /  100 * this.player.duration()
    
        this.player.seek(time)    
        this.setTime(number_percent)

        super.finishChangeTime(event)
    }

    setMute(event: click<HTMLDivElement>) {
        const lastVolume = this.lastVolume
    
        if (this.player.isMuted()) {
            this.player.setMute(false)
            
            this.player.setVolume(lastVolume)
        } else {
            this.player.setMute(true)
            this.lastVolume = this.player.getVolume() ?? 0.5
        }
    
        super.setMute(event, this.player.isMuted())
    }

    setPlay() {        
        if (this.player.isPaused()) {
            this.player.play()
        } else {
            this.player.pause()
        }
    }

    changeMute(event: click<HTMLSpanElement>) {
        const newVolume = super.changeMute(event)
    
        if (!newVolume)
            return undefined
        
        this.player.setVolume(newVolume)
        newVolume == 0 ? this.player.setMute(true) : this.player.setMute(false)
    }
}
