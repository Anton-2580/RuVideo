import { useTranslation } from "react-i18next"
import type { UserData } from "@/shared"
import { NavigateTextButton, NavigateImageButton, Paths } from "@/shared"
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

    const { t } = useTranslation()
    
    return (<div id={ styles.current_user_container } className="block" >
        <div className={ styles.current_user_info } >
            <img loading={loading} src={ acc_image } alt="картинка канала" style={{width: "3rem"}}/>
            <div>
                <p>{ data.username }</p>
                <NavigateTextButton to={Paths.CHANNEL +"/"+ data.pk} text={t("user.seeChannel")} />
            </div>
        </div>
        <hr />
        {divData(Paths.LOGOUT, t("user.signOut"), exit, "exit")}
        {divData(Paths.LOGIN, t("user.changeAccount"), change_channel, "change_channel")}
        <hr />
        {divData(Paths.SETTINGS, t("user.settings"), settings, "settings")}
    </div>)

    function divData(to: string, text: string, src: string, alt: string = "") {
        return (<div className={styles.current_user_info}>
            <NavigateImageButton to={to} image={src} alt={alt} />
            <NavigateTextButton to={to} text={text} />
        </div>)
    }
}
