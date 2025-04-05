import { lazy } from "react"


const LoginForm = lazy(() => import("./LoginForm"))
const RegistrationForm = lazy(() => import("./RegistrationForm"))

export {
    LoginForm,
    RegistrationForm,
}