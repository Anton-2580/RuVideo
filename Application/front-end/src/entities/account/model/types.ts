export type SubmitData = {
    username: string
    password?: string
    password1?: string
    password2?: string
    email: string
}

export type UserState = {
    isLogined: boolean
    logining: boolean
    likestFormat: string
    setIsLogined: (isLogined: boolean) => void
    setLogining: (logining: boolean) => void
    setState: (state: UserState | Object) => void
}
