import { search_black } from "@/shared/img"
import styles from "./search.module.css"


export default function MobileSearchButton() {
    return (<button id={ styles.mobile_search_button }>
        <img loading="lazy" src={ search_black } alt="Поиск" className="default-image" />
    </button>)
}
