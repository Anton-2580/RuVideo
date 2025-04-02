import type { DetailedHTMLProps, InputHTMLAttributes } from "react" 
import { useEffect, useRef, useState } from "react"
import { useThrottle } from "@/shared/hooks"
import styles from "./inputs.module.css"


type PasswordInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    message?: string
}


export function PasswordInput({message ,...props}: PasswordInputProps) {
    const [type, setType] = useState<"password" | "text">("password")
    const passwordPupilRef = useRef<HTMLDivElement>(null)

    const updateEyePosition: (ev: MouseEvent) => void = useThrottle((ev: MouseEvent) => {
        if (!passwordPupilRef.current || !passwordPupilRef.current.parentElement)
            return
        if (getComputedStyle(passwordPupilRef.current).display == "none")
            return

        const pos = passwordPupilRef.current.parentElement.getBoundingClientRect()

        let bottom = pos.y + pos.height / 2 - ev.y
        let right = pos.x + pos.width / 2 - ev.x

        const getValue = (distance: number, value: number) => {
            if (value > distance)
                return distance
            else if (-distance > value)
                return -distance
            return value
        }

        bottom = getValue(5, bottom)
        right = getValue(7, right)

        passwordPupilRef.current.style.bottom = bottom + "px"
        passwordPupilRef.current.style.right = right + "px"
    }, 250, true)

    useEffect(() => {
        document.addEventListener("mousemove", updateEyePosition)

        return () => {document.removeEventListener("mousemove", updateEyePosition)}
    }, [])

    return <><div className={styles.password_container}>
            <input className={ styles.input } type={ type } placeholder="Пароль" { ...props }/>
            <div className={styles.password_eye} typeof={ type } onClick={ () => setType(prev => {
                if (prev == "text")
                    return "password"
                return "text" 
            }) }>
                <div ref={passwordPupilRef} className={styles.password_pupil} ><div /></div>
            </div>
        </div>
        {message && <p>{message}</p>}
    </>
}
