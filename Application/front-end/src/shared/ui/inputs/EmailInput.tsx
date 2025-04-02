import type { FieldValues } from "react-hook-form"
import { RegistredFormInput, type RegistredFormInputProps } from "./RegistredFormInput"


export function EmailInput<T extends FieldValues>({options, ...props}: RegistredFormInputProps<T>) {
    return <RegistredFormInput placeholder="Email*" type="email" {...props}
        options={{
            pattern: {
                value: /^.+\@.+\..+$/,
                message: "некорректный email",
            },
            ...options
        }}
    />
}
