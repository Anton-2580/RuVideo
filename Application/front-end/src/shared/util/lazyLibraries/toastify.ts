import { lazy } from "react"
import type { toast as Toast } from "react-toastify"

const ToastContainer = lazy(() => import("react-toastify").then(module => ({default: module.ToastContainer})))
let toast: typeof Toast | undefined = undefined

async function setToast() {
    toast = await import("react-toastify").then(module => module.toast)
}

export {
    ToastContainer,
    toast,
    setToast,
}
