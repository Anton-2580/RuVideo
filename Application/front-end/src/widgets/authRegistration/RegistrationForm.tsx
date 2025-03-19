import { lazy, useRef } from "react"
import { useForm } from "react-hook-form"
import { SubmitData } from "@/entities"
import { BaseForm, PasswordInput, PathsAPI, FormInput, EmailInput } from "@/shared"

const DefaultToast = lazy(() => import("@/shared/ui/toasts/defaultToast"))


export default function RegistrationForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<SubmitData>()
    const data = useRef<SubmitData>({ username: "", password: "", email: "" })

    return (<BaseForm handleSubmit={handleSubmit} data={data} setIsComplete={() => {}} path={PathsAPI.REGISTRATION}>
        <FormInput placeholder="Логин" {...register("username")}/>
        <PasswordInput placeholder="Пароль" {...register("password")}/>
        <EmailInput register={register} field="email" message={errors.email?.message} />

        <DefaultToast />

        <FormInput type="submit" value="Зарегистрироваться"/>
    </BaseForm>)
}