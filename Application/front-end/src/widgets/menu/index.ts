import { lazy } from "react"


const Menu = lazy(() => import("./Menu"))
const MobileMenu = lazy(() => import("./MobileMenu"))
const ButtonMenu = lazy(() => import("./ButtonMenu"))

export {
    Menu,
    MobileMenu,
    ButtonMenu,
}