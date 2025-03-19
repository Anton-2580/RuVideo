import { useState } from "react"
import { useOrdinaryQuery, PathsAPI, NavigateTextButton, Paths, UserData, Images } from "@/shared"
import { useUserStore } from "@/entities"
import { CurrentUserInfo } from "./CurrentUserInfo"
import styles from "./currentuser.module.css"


export default function CurrentUserButton() {
    const [isVisible, setIsVisible] = useState(false)
    const isLogined = useUserStore(state => state.isLogined)
    
    const { isLoading, isSuccess, data } = useOrdinaryQuery<UserData>(PathsAPI.USER_DATA, undefined, undefined, {
        enabled: !!isLogined,
    })
    
    if (!isLogined || !isSuccess)
        return <>
            <NavigateTextButton to={Paths.LOGIN} text="Войти" />
            <NavigateTextButton to={Paths.REGISTRATION} text="Зарегистрироваться" />
        </>
    
    const photo = data?.photo ?? Images.default_user

    return (<div id={styles.current_user} >
        <div title="Пользователь" onClick={() => setIsVisible(prev => !prev)} id={styles.current_user_button} >
            <img src={photo} alt="картинка канала" /></div>
        {data ? <CurrentUserInfo isVisible={isVisible} acc_image={photo} loading="lazy" data={data} />
        : undefined}
    </div>)
}
