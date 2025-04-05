import { lazy } from "react"


const Search = lazy(() => import("./Search"))
const MobileSearchButton = lazy(() => import("./MobileSearchButton"))

export {
    Search,
    MobileSearchButton
}