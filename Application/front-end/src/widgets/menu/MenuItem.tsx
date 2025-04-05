import { Link } from "react-router"
import type { CSSProperties, PropsWithChildren } from "react"
import { motion, LazyMotion, domAnimation } from "@/shared/util/lazyLibraries/motion"
import { useTranslation } from "react-i18next"
import { ColorVars, ColorClassNames } from "@/app/styles/ColorVars"
import { useMenuStore } from "@/entities"
import styles from "./menu.module.css"


const selected = {
    backgroundColor: `var(${ColorVars.selected})`,
}


const padding = 0.25
const image_width = "2vw"
const menu_item_style = {
    transition: { duration: 0.2 },

    borderRadius: "5px",
    height: "auto",
    width: image_width,
    paddingInlineEnd: `${padding}rem`, paddingInlineStart: `${padding}rem`, paddingTop: `${padding}rem`, paddingBottom: `${padding}rem`,

    "--scale": 0,
    "--opacity": 0,
}

const full_menu_item_style = {
    transition: { duration: 0.2 },
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    fontSize: "calc(var(--font-size) * 0.8)",

    borderRadius: "20px",
    height: "max(2rem, 2.5vw)",
    width: "calc(100% - 0.6rem)",
    paddingInlineStart: "0.6rem",

    "--scale": 1,
    "--opacity": 1,
}


export type MenuItemProps = PropsWithChildren & {
    i18nkey: string
    image: string
    to: string
    selected?: boolean
    styleClass?: string
    style?: CSSProperties
    alt?: string
}


export function MenuItem({ i18nkey, ...props }: MenuItemProps) {
    const { t } = useTranslation()

    const isVisible = useMenuStore(state => state.isVisible)
    let style = isVisible ? full_menu_item_style : menu_item_style

    let itemStyle = isVisible ? styles.full_menu_item : styles.menu_item
    if (props.styleClass)
        itemStyle += " " + styles[props.styleClass]
    if (props.selected)
        style = {...style, ...selected}

    return (<LazyMotion features={domAnimation} >
        <motion.li animate={style} initial={full_menu_item_style} className={ itemStyle } style={ props.style } >
            <Link to={ props.to } className={ styles.menu_item_image }>
                <img loading="lazy" src={ props.image } alt={ props.alt ?? "MenuItem" } style={{
                    width: image_width,
                    marginBottom: "-3px",
                }} className={ColorClassNames.defaultImage} />
            </Link>
            <Link to={ props.to } style={{ paddingInlineStart: "5px", scale: "var(--scale)", opacity: "var(--opacity)", }} >
                <p>{ t(i18nkey) }</p>
            </Link>
        </motion.li>
    </LazyMotion>)
}
