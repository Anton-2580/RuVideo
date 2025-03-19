import axios, { AxiosError } from "axios"
import { useQuery, UseQueryOptions } from "react-query";


axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = "csrftoken"


export enum Query {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
}

export async function fetchData(path: string, signal: AbortSignal | undefined, query: Query = Query.GET, postData?: Object): Promise<any> {
    switch(query) {
        case "GET": return (await axios.get(path, { signal })).data
        case "POST": return (await axios.post(path, postData, { signal, withCredentials: true })).data
    }
}


export function useOrdinaryQuery<TQueryFnData = unknown, TError extends AxiosError = AxiosError, TData = TQueryFnData>(
    path: string,
    query: Query = Query.GET,
    postData?: Object,
    omit?: Omit<UseQueryOptions<TQueryFnData, TError, TData, any[]>, 'queryKey' | 'queryFn'>,
    queryKey: any[] = [],
) {
    return useQuery<TQueryFnData, TError, TData, any[]>(
        [path, query, postData, ...queryKey],
        ({ signal }) => fetchData(path, signal, query, postData), {
            keepPreviousData: true,
            ...omit,
    })
}
