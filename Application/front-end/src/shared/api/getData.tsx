import { UseQueryResult } from "react-query"
import { useOrdinaryQuery } from "./getUseQuery"
import { Pagination, type PathsAPI } from "./PathsAPI"


export function getDataObject(id: number, dataObject: PathsAPI): UseQueryResult {
    const path = dataObject + id + "/"

    return useOrdinaryQuery(path)
}


type skip = number
type limit = number

export function getDataObjects(
    dataObject: PathsAPI,
    skip: skip,
    limit: limit = 10,
): UseQueryResult {
    const path = dataObject + `?${Pagination.SKIP}=${skip}&?${Pagination.LIMIT}=${limit}`

    return useOrdinaryQuery(path)
}
