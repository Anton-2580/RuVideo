import { ToastContainer } from "@/shared/util/lazyLibraries/toastify"
import type { ToastContainerProps } from "react-toastify"


export default function DefaultToast(props: ToastContainerProps) {
    return <ToastContainer
        autoClose={3000}
        position="top-center"
        theme="dark"
        hideProgressBar
        pauseOnHover
        pauseOnFocusLoss
        draggable
        closeOnClick
        newestOnTop
        {...props}
    />
}