import { NavigateTextButton, NavigateImageButton, Paths, UserData } from "@/shared"
import styles from "./currentuser.module.css"
import {settings, change_channel, exit} from "@/shared/img"


type CurrentUserInfo = {
    isVisible: Boolean
    acc_image: string
    loading?: "eager" | "lazy"
    data: UserData
}


export function CurrentUserInfo({ isVisible, acc_image, loading, data }: CurrentUserInfo) {
    if (!isVisible)
        return
    
    return (<div id={ styles.current_user_container } className="block" >
        <div className={ styles.current_user_info } >
            <img src={ acc_image } alt="картинка канала" loading={loading} style={{width: "3rem"}}/>
            <div>
                <p>{ data.username }</p>
                <NavigateTextButton to={Paths.CHANNEL +"/"+ data.pk} text="Посмотреть канал" />
            </div>
        </div>
        <hr />
        {divData(Paths.LOGOUT, "Выйти", exit, "exit")}
        {divData(Paths.LOGIN, "Сменить аккаунт", change_channel, "change_channel")}
        <hr />
        {divData(Paths.SETTINGS, "Настройки", settings, "settings")}
    </div>)

    function divData(to: string, text: string, src: string, alt: string = "") {
        return (<div className={styles.current_user_info}>
            <NavigateImageButton to={to} image={src} alt={alt} />
            <NavigateTextButton to={to} text={text} />
        </div>)
    }
}
