import { FieldValues } from "react-hook-form"
import { RegistredFormInputProps, RegistredFormInput } from "./RegistredFormInput"


export function MandatoryFormInput<T extends FieldValues>({options, ...props}: RegistredFormInputProps<T>) {
    return <RegistredFormInput {...props} options={{
        required: "Обязательное поле",
        ...options
    }}/>
}
