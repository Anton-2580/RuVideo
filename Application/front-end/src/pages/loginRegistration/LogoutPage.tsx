import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Logo } from "@/widgets"
import { useUserStore } from "@/entities"
import { DefaultToast, PathsAPI, useOrdinaryQuery, Query, NavigateTextButton, Paths } from "@/shared"
import type { Id } from "react-toastify"
import { toast } from "@/shared/util/lazyLibraries/toastify"
import styles from "./loginRegistration.module.css"
import { tree_background } from "@/shared/img"


export default function LogoutPage() {
    const { t } = useTranslation()
    const id = useRef<Id>(undefined)
    const { setIsLogined } = useUserStore()

    useOrdinaryQuery(PathsAPI.LOGOUT, Query.POST, {}, {
        keepPreviousData: false,
        onError: () => {
            toast?.update(id.current ?? -1, { 
                render: t("loginRegistration.signOutError"),
                type: "error",
                isLoading: false,
                closeOnClick: true,
                autoClose: false,
            })
        },
        onSuccess: () => {
            setIsLogined(false)
            toast?.update(id.current ?? -1, { 
                render: t("loginRegistration.signOutSuccess"),
                type: "success",
                isLoading: false,
                closeOnClick: true,
                autoClose: 3000,
            })
        }
    })

    useEffect(() => {
        id.current = toast?.loading(t("loginRegistration.signOutLoading"))
    }, [!toast])

    return (
        <div className={ styles.container } style={{
            backgroundImage: `url(${tree_background})`,
            backgroundSize: "auto 100%",
        }} >
            <div className={styles.signOutBlock} >
                <Logo />
                <h1>{ t("loginRegistration.signOutTitle") }</h1>

                <aside>
                    <p>{t("loginRegistration.signOutInfo")}</p>
                </aside>
                <div className={styles.buttons} >
                    <NavigateTextButton to={Paths.HOME} text={ t("go_home") } className={styles.button} />
                    <NavigateTextButton to={Paths.LOGIN} text={ t("sign_in") } className={styles.button} />
                </div>
            </div>

            <DefaultToast />
        </div>
    )
}
