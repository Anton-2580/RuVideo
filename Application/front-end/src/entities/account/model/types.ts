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
    setIsLogined: (isLogined: boolean) => void
    setLogining: (logining: boolean) => void
}
