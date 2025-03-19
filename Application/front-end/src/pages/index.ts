import { lazy } from "react"


const Base = lazy(() => import("@/pages/base/Base"))
const HomePage = lazy(() => import("@/pages/home/HomePage"))
const LoginPage = lazy(() => import("@/pages/loginRegistration/LoginPage"))
const RegistrationPage = lazy(() => import("@/pages/loginRegistration/RegistrationPage"))
const ShortsPage = lazy(() => import("@/pages/shorts/ShortsPage"))
const SubscribesPage = lazy(() => import("@/pages/subscribes/SubscribesPage"))
const TranslationsPage = lazy(() => import("@/pages/translations/TranslationsPage"))

export {
    Base,
    HomePage,
    LoginPage,
    RegistrationPage,
    ShortsPage,
    SubscribesPage,
    TranslationsPage,
}
