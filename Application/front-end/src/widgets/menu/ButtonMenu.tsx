import { useState } from "react"
import styles from "./menu.module.css"
import { useMenuStore } from "@/entities"


export default function ButtonMenu() {
    const changeIsVisible = useMenuStore(state => state.changeIsVisible)
    const [id, changeId] = useState(styles.menu)

    const onClick = () => {
        if (id == styles.menu) 
            changeId(styles.selected_menu)
        else changeId(styles.menu)
        
        changeIsVisible()
    }

    return (
        <ul id={ id } onClick={ onClick } >
            <li id={ styles.menubar1 }/><li id={ styles.menubar2 }/><li id={ styles.menubar3 }/>
        </ul>
    )
}
