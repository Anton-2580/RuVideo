import type { DetailedHTMLProps, FormHTMLAttributes, RefObject } from "react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import type { UseFormHandleSubmit } from "react-hook-form"
import type { Id, TypeOptions, UpdateOptions } from "react-toastify"
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
    const navigate = useNavigate()

    const loadingId = useRef<Id>(-1)
    const { refetch, isLoading } = useOrdinaryQuery(path, Query.POST, data.current, {
        enabled: Object.values(data.current).some(Boolean),
        keepPreviousData: false,
        onSuccess: () => {
            compliteSend("success", successMessage, {autoClose: 3000})
            setIsComplete(true)
            navigate(successNavigate)
        },
        onError: (error) => {
            compliteSend("error", error.message)

            const data = error.response?.data as { [key: string]: string[] }
            if (!data)
                return
            
            const errorString = Object.keys(data).reduce((acc, value) => {
                if (!data.hasOwnProperty(value))
                    return acc

                return acc + "\n" + value + ": " + data[value].join(" ")
            }, '')

            toast?.info(errorString)
        },
    })


    const compliteSend = (type: TypeOptions, message?: string, options?: UpdateOptions) => {
        toast?.update(loadingId.current, {
            render: message,
            type,
            isLoading: false,
            autoClose: false,
            closeOnClick: true,
            ...options
        })
        loadingId.current = -1
    }

    useEffect(() => {
        if (isLoading && toast) {
            loadingId.current = toast.loading(loadingMessage)
        }
    }, [isLoading])

    const onSubmit = (newData: T) => {
        if (loadingId.current == -1) {
            data.current = newData
            refetch()
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)} {...props} className={styles.form +" "+ className}></form>
}
