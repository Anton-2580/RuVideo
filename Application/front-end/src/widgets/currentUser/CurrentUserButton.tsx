import { useState } from "react"
import { useTranslation } from "react-i18next"
import type { UserData } from "@/shared"
import { useOrdinaryQuery, PathsAPI, NavigateTextButton, Paths, Images } from "@/shared"
import { useUserStore } from "@/entities"
import { CurrentUserInfo } from "./CurrentUserInfo"
import styles from "./currentuser.module.css"
import { getIsMobileVersion } from "@/shared/util/functions"


export default function CurrentUserButton() {
    const [isVisible, setIsVisible] = useState(false)
    const isLogined = useUserStore(state => state.isLogined)
    
    const { isLoading, isSuccess, data } = useOrdinaryQuery<UserData>(PathsAPI.USER_DATA, undefined, undefined, {
        enabled: !!isLogined,
    })
    
    if (!isLogined || !isSuccess)
        return <AuthRegisterButton />
    
    if (getIsMobileVersion()) {
        return 
    }
    
    const photo = data?.photo ?? Images.default_user

    return (<div id={styles.current_user} >
        <div title="Пользователь" onClick={() => setIsVisible(prev => !prev)} id={styles.current_user_button} >
            <img src={photo} alt="картинка канала" />
        </div>
        {data ? <CurrentUserInfo isVisible={isVisible} acc_image={photo} loading="lazy" data={data} />
        : undefined}
    </div>)
}


function AuthRegisterButton() {
    const [isShow, setIsShow] = useState(false)
    const { t } = useTranslation()

    return (<div id={styles.auth_register_btn}>
        <img src={Images.login_register} alt="login_register" 
            className="default-image" onClick={() => setIsShow(prev => !prev)} 
        />
        {isShow ? <div id={styles.auth_container} className="block">
            <NavigateTextButton to={Paths.LOGIN} id={styles.login_button} text={ t("sign_in") } />
            <NavigateTextButton to={Paths.REGISTRATION} id={styles.register_button} text={ t("sign_up") } />
        </div>: undefined}
    </div>)
}
