import { Link } from "react-router" 
import { Paths } from "@/shared"
import styles from "./logo.module.css"
import { big_logo, small_logo1, small_logo2 } from "@/shared/img"


export default function Logo() {
    return <div id={ styles.logo }>
        <Link to={ Paths.HOME }><img className={styles.big_logo} src={ big_logo } alt="big_logo"></img></Link>
        <Link to={ Paths.HOME }>
            <img className={styles.small_logo} src={ small_logo1 } alt="small_logo"></img>
            <img className={styles.small_logo} src={ small_logo2 } alt="small_logo"></img>
        </Link>
    </div>
}
