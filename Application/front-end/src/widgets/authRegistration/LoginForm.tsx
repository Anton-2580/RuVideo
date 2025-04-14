import { useRef } from "react"
import { Link } from "react-router"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Logo } from "@/widgets/logo"
import { DefaultToast, BaseForm, EmailInput, FormInput, PasswordInput, Paths, PathsAPI } from "@/shared"
import { type SubmitData, useUserStore } from "@/entities"
import AlternativesAuth from "./AlternativesAuth"
import styles from "@/shared/ui/forms/forms.module.css"



export default function LoginForm() {
    const setIsLogined = useUserStore(state => state.setIsLogined)
    const { handleSubmit, register, formState: { errors } } = useForm<SubmitData>({
        reValidateMode: "onChange",
    })
    const data = useRef<SubmitData>({ username: "", password: "", email: "" })

    const { t } = useTranslation()

    return <BaseForm 
        loadingMessage={ t("loginRegistration.signInLoading") }
        successMessage={ t("loginRegistration.signInSuccess") }
        successNavigate={Paths.HOME}
        handleSubmit={handleSubmit}
        data={data}
        setIsComplete={setIsLogined}
        path={PathsAPI.LOGIN}
        className={styles.standart_form}
    >
        <Logo endLogoProps={{style: { filter: "invert(1)" } }} />
        <h3 style={{ fontSize: "1.5em" }}>{ t("loginRegistration.signInTitle") }</h3>

        <FormInput message={errors.username?.message} { ...register("username", { 
                required: t("loginRegistration.loginRequired"),
        }) } className={styles.standart_input} >
            <h6>{ t("loginRegistration.login") }: </h6>
        </FormInput>
        <PasswordInput message={errors.password?.message} { ...register("password", { 
                required: t("loginRegistration.passwordRequired"),
        }) } className={styles.standart_input} bottomChildren={ 
            <Link to={Paths.PASSWORD_RECOVERY} className={styles.password_link} >{ t("loginRegistration.forgotPassword") }</Link> 
        }>
            <h6>{ t("loginRegistration.password") }</h6>
        </PasswordInput>
        <EmailInput register={register} field="email" message={errors.email?.message} className={styles.standart_input} >
            <h6>{ t("loginRegistration.email") }: </h6>
        </EmailInput>

        <DefaultToast />

        <FormInput type="submit" value={ t("loginRegistration.signIn") } className={styles.standart_button} />

        <AlternativesAuth />
    </BaseForm>
}
