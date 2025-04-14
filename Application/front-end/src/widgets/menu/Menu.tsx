import { useLocation } from "react-router"
import { useTranslation } from "react-i18next"
import { MenuItem, type MenuItemProps } from "./MenuItem"
import { menuItems } from "./menuItems"
import styles from "./menu.module.css"


export default function Menu() {
    const { t } = useTranslation()

    function getMenuTitle(index: number) {
        if (index <= 0)
            return 

        return <h4 key={"menu title " + index}>{ t(menuItems.titleKeys[index - 1]) }</h4>
    }

    function getMenuBlock(element: MenuItemProps[], index: number) {
        return <ul className={ styles.group } key={"menu group " + index}>{
            element.map((item, i) => {
                if (item.to == useLocation().pathname)
                    item = { ...item, selected: true }

                return <MenuItem key={`${index}${i}`} {...item}/>
            })
        }</ul>
    }

    return (<nav className={ styles.groups }>{
        menuItems.menuItemList.map((element, i1) => (<div key={"menu groups item" + i1} className={ styles.groups_container }>
            { getMenuTitle(i1) }
            { getMenuBlock(element, i1) }
            { menuItems.menuItemList.length != i1+1 ? <hr key={"menu hr " + i1}/> : ""}
        </div>))
    }</nav>)
}

