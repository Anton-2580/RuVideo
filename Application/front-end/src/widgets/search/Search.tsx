import { useEffect, useRef } from "react"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { useSearch } from "@/features"
import { search as searchImg, listen } from "@/shared/img"
import { toast } from "@/shared/util/lazyLibraries/toastify"
import styles from "./search.module.css"


export default function Search() {
    const search = useSearch()
    const inputRef = useRef<HTMLInputElement>(null)

    const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition, isMicrophoneAvailable } = useSpeechRecognition()


    function dictaphone() {
        if (!browserSupportsSpeechRecognition)
            return toast.info("Браузер не поддерживает микрофон")
        if (!isMicrophoneAvailable)
            return toast.info("Микрофон не доступен")


        if (listening)
            SpeechRecognition.stopListening()
        else {
            resetTranscript()
            SpeechRecognition.startListening({ continuous: true, language: "ru" })
        }
    }

    useEffect(() => {
        if (inputRef.current !== null) inputRef.current.value = transcript 
    }, [transcript])

    return (<div id={ styles.search }>
        <input type="text" title="Поиск" ref={inputRef} />
        <div>
            <button type="submit" onClick={ () => search(inputRef.current ? inputRef.current.value : "")
                } id={ styles.search_button }><img src={searchImg} alt="Поиск" /></button>
        </div>
        <button type="button" onClick={ dictaphone } id={ styles.dictaphone_button }>
            <img src={listen} alt="Диктафон" />
        </button>
    </div>)
}