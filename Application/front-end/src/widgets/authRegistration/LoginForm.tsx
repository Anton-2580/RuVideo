import { lazy, useRef } from "react"
import { useForm } from "react-hook-form"
import { BaseForm, EmailInput, FormInput, PasswordInput, PathsAPI } from "@/shared"
import { SubmitData, useUserStore } from "@/entities"

const DefaultToast = lazy(() => import("@/shared/ui/toasts/defaultToast"))


export default function LoginForm() {
    const setIsLogined = useUserStore(state => state.setIsLogined)
    const { handleSubmit, register, formState: { errors } } = useForm<SubmitData>({
        reValidateMode: "onChange",
    })
    const data = useRef<SubmitData>({ username: "", password: "", email: "" })

    return <BaseForm handleSubmit={handleSubmit} data={data} setIsComplete={setIsLogined} path={PathsAPI.LOGIN}>
        <FormInput message={errors.username?.message} { ...register("username", { 
                required: "вход без логина не поддерживается",
            }) } placeholder="Логин" />
        <PasswordInput message={errors.password?.message} { ...register("password", { 
                required: "вход без пароля не поддерживается",
            }) } />
        <EmailInput register={register} field="email" message={errors.email?.message} />

        <DefaultToast />

        <FormInput type="submit" value="Войти"/>
    </BaseForm>
}
