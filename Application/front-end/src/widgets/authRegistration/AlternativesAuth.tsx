import { useTranslation } from "react-i18next"
import styles from "./alternativesAuth.module.css"


export default function AlternativesAuth() {
    const { t } = useTranslation()
    
    return (<>
        <aside id={styles.or_block}>
            <hr />
            <p>{ t("loginRegistration.or") }</p>
            <hr />
        </aside>

        <div id={styles.alternatives_auth}>
        </div>
    </>)
}