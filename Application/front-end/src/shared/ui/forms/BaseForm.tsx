import type { DetailedHTMLProps, FormHTMLAttributes, RefObject } from "react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import type { UseFormHandleSubmit } from "react-hook-form"
import type { Id, TypeOptions } from "react-toastify"
import { setToast, toast } from "@/shared/util/lazyLibraries/toastify"
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
    handleSubmit: UseFormHandleSubmit<T, any>
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
    if (toast === undefined) {
        setToast()
    }

    const navigate = useNavigate()
    const { refetch, error, isLoading, isSuccess } = useOrdinaryQuery(path, Query.POST, data.current, {
        enabled: Object.values(data.current).some(Boolean),
    })


    const compliteSend = (type: TypeOptions, message?: string) => {
        toast?.update(loadingId.current, {
            render: message,
            type,
            isLoading: false,
            autoClose: 1000,
        })
        loadingId.current = -1
    }

    const loadingId = useRef<Id>(-1)

    useEffect(() => {
        if (error) {
            compliteSend("error", error?.message)

            const data = error?.response?.data as Object
            
            const errorString = Object.keys(data).reduce((acc, value) => {
                if (!data.hasOwnProperty(value))
                    return acc

                return acc + "\n" + value + ": " + data[value].join(" ")
            }, '')

            toast?.info(errorString)
        }
    }, [error])
    useEffect(() => {
        if (isLoading && toast) {
            loadingId.current = toast.loading(loadingMessage)
        }
    }, [isLoading])
    useEffect(() => {
        if (isSuccess) {
            compliteSend("success", successMessage)
            setIsComplete(true)
            navigate(successNavigate)
        }
    }, [isSuccess])

    const onSubmit = (newData: T) => {
        if (loadingId.current == -1) {
            data.current = newData
            refetch()
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)} {...props} className={styles.form +" "+ className}></form>
}
