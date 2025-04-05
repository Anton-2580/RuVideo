import { useEffect } from "react"


export function usePagination(
    scrollHandler: (this: Document, ev: DocumentEventMap["scroll"]) => void,
) {
    useEffect(() => {
        document.addEventListener("scroll", scrollHandler)

        return () => {
            document.removeEventListener("scroll", scrollHandler)
        }
    }, [])
}