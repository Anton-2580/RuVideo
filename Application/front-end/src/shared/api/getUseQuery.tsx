import axios from "axios"
import { useQuery, UseQueryResult } from "react-query"


async function fetchData(path: string) {
    const data = await axios.get(path)

    return data.data
}


export function getData(queryKey: string, path: string): UseQueryResult {
    return useQuery(
        [queryKey, path],
        () => fetchData(path), 
        {
            keepPreviousData: true,
        }
    )
}
