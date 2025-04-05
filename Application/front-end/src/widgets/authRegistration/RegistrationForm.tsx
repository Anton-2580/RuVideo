import { lazy, useRef } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Logo } from "@/widgets/logo"
import type { SubmitData } from "@/entities"
import { BaseForm, PasswordInput, PathsAPI, FormInput, EmailInput, Paths } from "@/shared"
import styles from "@/shared/ui/forms/forms.module.css"
import AlternativesAuth from "./AlternativesAuth"

const DefaultToast = lazy(() => import("@/shared/ui/toasts/defaultToast"))


export default function RegistrationForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<SubmitData>()
    const data = useRef<SubmitData>({ username: "", password1: "", password2: "", email: "" })

    const { t } = useTranslation()

    return (<BaseForm
        loadingMessage={ t("loginRegistration.signUpLoading") }
        successMessage={ t("loginRegistration.signUpSuccess") }
        successNavigate={Paths.LOGIN}
        handleSubmit={handleSubmit} 
        data={data} 
        setIsComplete={() => {}} 
        path={PathsAPI.REGISTRATION}
        className={styles.standart_form}
    >
        <Logo endLogoProps={{style: { filter: "invert(1)" } }} />
        <h3 style={{ fontSize: "1.5em" }}>{ t("loginRegistration.signUpTitle") }</h3>

        <FormInput message={errors.username?.message} { ...register("username", { 
                required: t("loginRegistration.loginRequired"),
        }) } className={styles.standart_input} >
            <h6>{ t("loginRegistration.login") }: </h6>
        </FormInput>
        <PasswordInput message={errors.password?.message} { ...register("password1", { 
                required: t("loginRegistration.passwordRequired"),
        }) } className={styles.standart_input} >
            <h6>{ t("loginRegistration.password") }</h6>
        </PasswordInput>
        <PasswordInput message={errors.password?.message} { ...register("password2", { 
                required: t("loginRegistration.passwordRequired"),
        }) } className={styles.standart_input} >
            <h6>{ t("loginRegistration.password") }</h6>
        </PasswordInput>
        <EmailInput register={register} field="email" message={errors.email?.message} className={styles.standart_input} >
            <h6>{ t("loginRegistration.email") }: </h6>
        </EmailInput>

        <DefaultToast />

        <FormInput type="submit" value={ t("loginRegistration.signUp") } className={styles.standart_button} />

        <AlternativesAuth />
    </BaseForm>)
}