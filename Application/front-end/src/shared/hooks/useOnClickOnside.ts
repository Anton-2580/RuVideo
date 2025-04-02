import { useEffect } from "react"


export function useOnClickOnside(
    handler: (event: MouseEvent | TouchEvent) => void,
    deps?: any,
) {
    useEffect(() => {
        document.addEventListener("mousedown", handler)
        document.addEventListener("touchstart", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
            document.removeEventListener("touchstart", handler)
        }
    }, [handler, ...deps])
}