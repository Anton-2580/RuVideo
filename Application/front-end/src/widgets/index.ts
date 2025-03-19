import { lazy } from "react"

const ContentHeader = lazy(() => import("./headers/").then(module => ({ default: module.ContentHeader })))
const Menu = lazy(() => import("./menu/Menu"))
const ButtonMenu = lazy(() => import("./menu/ButtonMenu"))
const Search = lazy(() => import("./search/Search"))
const MobileSearchButton = lazy(() => import("./search/MobileSearchButton"))
const CurrentUserButton = lazy(() => import("./currentUser/CurrentUserButton"))
const LoginForm = lazy(() => import("./authRegistration/LoginForm"))
const RegistrationForm = lazy(() => import("./authRegistration/RegistrationForm"))
const Logo = lazy(() => import("./logo/Logo"))
const VideoCard = lazy(() => import("./video/VideoCard"))

export { 
    ContentHeader,
    Menu,
    ButtonMenu,
    Search,
    MobileSearchButton,
    CurrentUserButton,
    LoginForm,
    RegistrationForm,
    Logo,
    VideoCard,
}
