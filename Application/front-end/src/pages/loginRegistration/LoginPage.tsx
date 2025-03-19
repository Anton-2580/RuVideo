import { LoginForm } from "@/widgets"
import styles from "./loginRegistration.module.css"


export default function LoginPage() {
    return (<div className={styles.container} >
        <LoginForm />
    </div>)
}
