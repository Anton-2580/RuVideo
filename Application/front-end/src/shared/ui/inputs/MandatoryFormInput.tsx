import type { FieldValues } from "react-hook-form"
import { type RegistredFormInputProps, RegistredFormInput } from "./RegistredFormInput"


export function MandatoryFormInput<T extends FieldValues>({options, ...props}: RegistredFormInputProps<T>) {
    return <RegistredFormInput {...props} options={{
        required: "Обязательное поле",
        ...options
    }}/>
}
