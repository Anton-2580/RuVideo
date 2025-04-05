import { Link } from "react-router"
import { useTranslation } from "react-i18next"
import { useUserStore } from "@/entities"
import { getIsMobileVersion } from "@/shared/util/functions"
import type { MenuItemProps } from "./MenuItem"
import { mobileMenuItems } from "./menuItems"
import styles from "./menu.module.css"


export default function MobileMenu() {
    if (!getIsMobileVersion()) return

    const isLogined = useUserStore(state => state.isLogined)

    return (<nav id={ styles.mobile_menu }>
        {mobileMenuItems.map((item) => {
            if (item.forLogined && !isLogined)
                return undefined
            
            return <MenuItem {...item}/>
        })}
    </nav>)
}

function MenuItem({ i18nkey, image, to, selected, alt, style }: MenuItemProps) {
    const { t } = useTranslation()

    return (<div className={styles.mobile_menu_item} style={ style }>
        <Link to={ to } style={{ height: i18nkey ? "40%" : "60%" }}>
            <img loading="lazy" src={ image } alt={alt} height="100%" className="default-image"/>
        </Link>
        { i18nkey ? <Link to={ to }> <p>{ t(i18nkey) }</p> </Link> : undefined }
    </div>)
}