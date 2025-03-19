import { useNavigate } from "react-router"
import { Paths } from "@/shared"
import { useSearchStore } from "@/entities"


export function useSearch() {
    const setSearch = useSearchStore(state => state.setSearch)
    const navigate = useNavigate()

    return (value: string) => { 
        setSearch(value)
        navigate(Paths.SEARCH)
    }
}
