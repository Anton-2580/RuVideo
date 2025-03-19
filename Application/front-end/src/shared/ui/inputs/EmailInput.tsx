import { FieldValues } from "react-hook-form"
import { RegistredFormInput, RegistredFormInputProps } from "./RegistredFormInput"


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
