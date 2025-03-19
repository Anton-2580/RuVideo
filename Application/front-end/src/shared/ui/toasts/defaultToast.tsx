import { ToastContainer } from "@/shared/util/lazyLibraries/toastify"


export default function DefaultToast() {
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
    />
}