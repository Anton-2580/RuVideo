import type { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form"
import { FormInput, type FormInputProps } from "./FormInput"


export type RegistredFormInputProps<T extends FieldValues> = FormInputProps & {
    options?: RegisterOptions<T>
    field: Path<T>
    register: UseFormRegister<T>
}


export function RegistredFormInput<T extends FieldValues>({register, field, options, ...props}: RegistredFormInputProps<T>) {
    return <FormInput {...props} { ...register(field, options) }/>
}
