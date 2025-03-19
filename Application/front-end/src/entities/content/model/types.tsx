export type SearchState = {
    search: string
    setSearch: (search: string) => void
}


export type MenuState = {
    isVisible: boolean
    changeIsVisible: () => void
}
