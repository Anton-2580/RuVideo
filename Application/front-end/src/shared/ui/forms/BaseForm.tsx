import { DetailedHTMLProps, FormHTMLAttributes, RefObject, useRef } from "react"
import { useNavigate } from "react-router"
import { UseFormHandleSubmit } from "react-hook-form"
import { Id, TypeOptions } from "react-toastify"
import { toast } from "@/shared/util/lazyLibraries/toastify"
import { Paths, PathsAPI, Query, useOrdinaryQuery } from "@/shared"
import styles from "./forms.module.css" 


type BaseFormProps<T extends Object> = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    path: PathsAPI
    data: RefObject<T>
    setIsComplete: (value: boolean) => void
    handleSubmit: UseFormHandleSubmit<T, undefined>
}


export function BaseForm<T extends Object>({ path, data, setIsComplete, handleSubmit, className, ...props }: BaseFormProps<T>) {
    const navigate = useNavigate()
    const { refetch, error, isLoading, isSuccess } = useOrdinaryQuery(path, Query.POST, data.current, {
        enabled: Object.values(data.current).some(Boolean),
    })
    const submitCount = useRef(0)
    
    function sendMessage(
        numberOfSubmit: RefObject<number>,
        value: any,
        body: () => void
    ): void {
        if (submitCount.current !== numberOfSubmit.current && value) {
            body()
            numberOfSubmit.current += 1
        }
    }

    const compliteSend = (message: string | undefined, type: TypeOptions) => {
        toast.update(loadingId.current, {
            render: message,
            type,
            isLoading: false,
            autoClose: 1000,
        })
        loadingId.current = -1
    }

    const loadingId = useRef<Id>(-1)
    const loadingNumberOfSubmit = useRef(0)
    const compliteNumberOfSubmit = useRef(0)

    sendMessage(compliteNumberOfSubmit, error, () => compliteSend(error?.message, "error"))
    sendMessage(loadingNumberOfSubmit, isLoading, () => {loadingId.current = toast.loading("аутентификация...", )})
    sendMessage(compliteNumberOfSubmit, isSuccess, () => {
        compliteSend("успешный вход", "success")
        setIsComplete(true)
        navigate(Paths.HOME)
    })

    const onSubmit = (newData: T) => {if (loadingId.current == -1) {
        data.current = newData
        submitCount.current += 1
        refetch()
    }}

    return <form onSubmit={handleSubmit(onSubmit)} {...props} className={styles.form +" "+ className}></form>
}
