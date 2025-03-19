import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react"


type MenuContextType = {
    isVisible: Boolean
}
type MenuActionsContextType = {
    changeIsVisible: () => void
}

const MenuContext = createContext<MenuContextType>({ isVisible: true })
const MenuActionsContext = createContext<MenuActionsContextType>({ changeIsVisible: () => {} })

export const useMenuContext = () => useContext(MenuContext)
export const useMenuActionsContext = () => useContext(MenuActionsContext)


export function MenuProvider({ children }: PropsWithChildren) {
    const [isVisible, setIsVisible] = useState(true)
    const changeIsVisible = useCallback(() => {
        setIsVisible(prev => !prev)
    }, [])

    return <MenuContext.Provider value={{ isVisible }}>
        <MenuActionsContext.Provider value={{ changeIsVisible }}>
            { children }
        </MenuActionsContext.Provider>
    </MenuContext.Provider>
}
