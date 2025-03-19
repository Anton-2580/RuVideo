import { useCallback, useRef } from "react";


export function useThrottle(callback: (...args: any) => void, delay: number, doLastInvoke = false) {
    const throttle = useRef<{isThrottle: boolean, args: any}>({isThrottle: false, args: null})

    return useCallback((...args: any) => {
        if (throttle.current.isThrottle) {
            throttle.current.args = args
            return
        }

        callback(...args)
        throttle.current.isThrottle = true
        setTimeout(() => {
            const last_args = throttle.current.args
            throttle.current = {isThrottle: false, args: null}

            if (doLastInvoke && last_args)
                callback(...last_args)
        }, delay)
    }, [delay])
}
