import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { UserState } from "./types"


export const useUserStore = create<UserState>()(persist((set) => ({
    isLogined: false,
    logining: false,
    likestFormat: "mpd",

    setIsLogined: (newIsLogined) => set(state => ({
        ...state,
        isLogined: newIsLogined
    })),

    setLogining: (newLogining) => set(state => ({
        ...state,
        logining: newLogining
    })),

    setState: (newState) => set(state => ({
        ...state,
        ...newState
    })),
}), {
    name: "user-storage",
}))
