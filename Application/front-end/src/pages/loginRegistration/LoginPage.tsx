import { LoginForm } from "@/widgets"
import { tree_background } from "@/shared/img"
import styles from "./loginRegistration.module.css"


export default function LoginPage() {
    return (<div className={styles.container} style={{
        backgroundImage: `url(${tree_background})`,
        backgroundSize: "auto 100%",
    }} >
        <LoginForm />
    </div>)
}
