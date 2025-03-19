import { lazy } from "react"

const ToastContainer = lazy(() => import("react-toastify").then(module => ({default: module.ToastContainer})))
const toast = lazy(() => import("react-toastify").then(module => ({default: module.toast})))._result

export {
    ToastContainer,
    toast,
}
