import { lazy } from "react"


const Base = lazy(() => import("@/pages/base/Base"))
const HomePage = lazy(() => import("@/pages/home/HomePage"))
const LoginPage = lazy(() => import("@/pages/loginRegistration/LoginPage"))
const LogoutPage = lazy(() => import("@/pages/loginRegistration/LogoutPage"))
const RegistrationPage = lazy(() => import("@/pages/loginRegistration/RegistrationPage"))
const ShortsPage = lazy(() => import("@/pages/shorts/ShortsPage"))
const SubscribesPage = lazy(() => import("@/pages/subscribes/SubscribesPage"))
const TranslationsPage = lazy(() => import("@/pages/translations/TranslationsPage"))
const VideoPage = lazy(() => import("@/pages/video/VideoPage"))
const YouPage = lazy(() => import("@/pages/you/YouPage"))

export {
    Base,
    HomePage,
    LoginPage,
    LogoutPage,
    RegistrationPage,
    ShortsPage,
    SubscribesPage,
    TranslationsPage,
    VideoPage,
    YouPage,
}
