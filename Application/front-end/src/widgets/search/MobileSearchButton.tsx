import { search as searchImg } from "@/shared/img"
import styles from "./search.module.css"


export default function MobileSearchButton() {
    return (<button id={ styles.mobile_search_button }><img src={ searchImg } alt="Поиск"/></button>)
}
