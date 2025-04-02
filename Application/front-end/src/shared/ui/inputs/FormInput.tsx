import type { DetailedHTMLProps, InputHTMLAttributes } from "react"
import type { Message } from "react-hook-form"
import styles from "./inputs.module.css"


export type FormInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    message?: Message
}


export function FormInput({message, children, ...props}: FormInputProps) {
    return (<>
        <input className={styles.input} {...props}/>{ children }
        {message && <p>{message}</p>}
    </>)
}
