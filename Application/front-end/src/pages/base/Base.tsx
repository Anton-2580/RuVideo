import { JSX, lazy } from "react"
import { Outlet } from "react-router"

const DefaultToast = lazy(() => import("@/shared/ui/toasts/defaultToast"))


type BaseProps = {
    Header: () => JSX.Element
    Footer?: () => JSX.Element
    Wrapper?: () => JSX.Element
}


export default function Base({ Header, Footer, Wrapper }: BaseProps) {
    return (<>
        <DefaultToast />
        <div id="page">
            <Header />
            <div id="wrapper">
                {Wrapper ? <Wrapper /> : undefined}
                <Outlet />
            </div>
        </div>
        {Footer && <Footer />}
    </>)
}