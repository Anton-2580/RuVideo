import { type MenuItemProps } from "./MenuItem"
import { Paths } from "@/shared"
import { 
    home,
    shorts,
    unselected_subscribes,
    translations,
    history,
    your_videos,
    see_later,
    likes,
    standard_default_user,
    add,
} from "@/shared/img"


type MenuItems = {
    titleKeys: string[],
    menuItemList: MenuItemProps[][],
}

export const menuItems: MenuItems = { 
    titleKeys: [
        "menu.titles.you",
        "menu.titles.subscriptions",
    ],

    menuItemList: [[
            {
                i18nkey: "menu.items.home",
                image: home,
                to: Paths.HOME,
            },
            {
                i18nkey: "menu.items.shorts",
                image: shorts,
                to: Paths.SHORTS,
            },
            {
                i18nkey: "menu.items.subscriptions",
                image: unselected_subscribes,
                to: Paths.SUBSCRIBES,
            },
            {
                i18nkey: "menu.items.translations",
                image: translations,
                to: Paths.TRANSLATIONS,
                style: {color: "red"}
            },
        ],
        [
            {
                i18nkey: "menu.items.history",
                image: history,
                to: Paths.HISTORY,
            },
            {
                i18nkey: "menu.items.your_videos",
                image: your_videos,
                to: Paths.YOUR_VIDEOS,
            },
            {
                i18nkey: "menu.items.see_later",
                image: see_later,
                to: Paths.SEE_LATER,
            },
            {
                i18nkey: "menu.items.liked",
                image: likes,
                to: Paths.LIKES,
            },
        ],
    ]
}


export const mobileMenuItems: (MenuItemProps & {
    forLogined?: boolean,
})[] = [
    {
        i18nkey: "menu.items.home",
        image: home,
        to: Paths.HOME,
    },
    {
        i18nkey: "menu.items.shorts",
        image: shorts,
        to: Paths.SHORTS,
    },
    {
        i18nkey: "",
        image: add,
        to: Paths.ADD_CONTENT,
        forLogined: true,
    },
    {
        i18nkey: "menu.items.subscriptions",
        image: unselected_subscribes,
        to: Paths.SUBSCRIBES,
    },
    {
        i18nkey: "menu.items.you",
        image: standard_default_user,
        to: Paths.YOU,
    },
]