import { useCallback, useRef } from "react"


export function useDebaunce(callback: (...args: any) => void, delay: number) {
    let timer = useRef<NodeJS.Timeout | null>(null)
    
    return useCallback((...args: any) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])
}