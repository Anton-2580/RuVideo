import type { HTMLAttributes } from "react"
import { Link } from "react-router" 
import { Paths } from "@/shared"
import styles from "./logo.module.css"
import { logo1, logo2 } from "@/shared/img"


type Props = HTMLAttributes<HTMLDivElement> & {
    startLogoProps?: HTMLAttributes<HTMLImageElement>
    endLogoProps?: HTMLAttributes<HTMLImageElement>
}

export default function Logo({id, startLogoProps, endLogoProps, ...props}: Props) {
    return <div id={ styles.logo + ' ' + id } { ...props }>
        <Link to={ Paths.HOME } >
            <img {...startLogoProps} className={styles.logo} loading="lazy" src={ logo1 } alt="logo" />
            <img {...endLogoProps} className={styles.logo +' '+ styles.logo_white} loading="lazy" src={ logo2 } alt="logo" />
        </Link>
    </div>
}
