import { RegistrationForm } from "@/widgets"
import { tree_background } from "@/shared/img"
import styles from "./loginRegistration.module.css"


export default function RegistrationPage() {
    return (<div className={styles.container} style={{
        backgroundImage: `url(${tree_background})`,
        backgroundSize: "auto 100%",
    }} >
        <RegistrationForm />
    </div>)
}
