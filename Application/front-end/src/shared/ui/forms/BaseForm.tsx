import type { DetailedHTMLProps, FormHTMLAttributes, RefObject } from "react"
import { useRef } from "react"
import { useNavigate } from "react-router"
import { UseFormHandleSubmit } from "react-hook-form"
import type { Id, TypeOptions } from "react-toastify"
import { toast } from "@/shared/util/lazyLibraries/toastify"
import type { Paths, PathsAPI } from "@/shared"
import { Query, useOrdinaryQuery } from "@/shared/api"
import styles from "./forms.module.css" 


type BaseFormProps<T extends Object> = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    path: PathsAPI
    data: RefObject<T>
    loadingMessage: string
    successMessage: string
    successNavigate: Paths
    
    setIsComplete: (value: boolean) => void
    handleSubmit: UseFormHandleSubmit<T, undefined>
}


export function BaseForm<T extends Object>({ 
    path,
    data,
    loadingMessage,
    successMessage,
    successNavigate,
    setIsComplete,
    handleSubmit,
    className,
    ...props
}: BaseFormProps<T>) {
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

    const compliteSend = (type: TypeOptions, message?: string) => {
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

    sendMessage(compliteNumberOfSubmit, error, () => compliteSend("error", error?.message))
    sendMessage(loadingNumberOfSubmit, isLoading, () => {loadingId.current = toast.loading(loadingMessage)})
    sendMessage(compliteNumberOfSubmit, isSuccess, () => {
        compliteSend("success", successMessage)
        setIsComplete(true)
        navigate(successNavigate)
    })

    const onSubmit = (newData: T) => {if (loadingId.current == -1) {
        data.current = newData
        submitCount.current += 1
        refetch()
    }}

    return <form onSubmit={handleSubmit(onSubmit)} {...props} className={styles.form +" "+ className}></form>
}
