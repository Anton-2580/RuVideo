import { RegistrationForm } from "@/widgets"
import styles from "./loginRegistration.module.css" 


export default function RegistrationPage() {
    return (<div className={styles.container} >
        <RegistrationForm />
    </div>)
}
