import type { DetailedHTMLProps, InputHTMLAttributes } from "react"
import type { Message } from "react-hook-form"
import styles from "./inputs.module.css"


export type FormInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    message?: Message
}


export function FormInput({message, children, className, ...props}: FormInputProps) {
    return (<div className={styles.input_container}>
        { children }
        <input className={styles.input + ' ' + className} {...props}/>
        {message && <p>{message}</p>}
    </div>)
}
