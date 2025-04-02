import { create } from "zustand"
import type { SearchState, MenuState } from "./types"


export const useSearchStore = create<SearchState>((set) => ({
    search: "",

    setSearch: (search: string) => set(state => ({
        ...state,
        search: search,   
    })),
}))


export const useMenuStore = create<MenuState>((set) => ({
    isVisible: true,

    changeIsVisible: () => set(state => ({
        ...state,
        isVisible: !state.isVisible,
    })),
}))