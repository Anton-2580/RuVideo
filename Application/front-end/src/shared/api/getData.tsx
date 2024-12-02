import { UseQueryResult } from "react-query"
import { getData } from "./getUseQuery"
import { Pagination, PathsAPI } from "./PathsAPI"


export function getOneDataObject(id: number, dataObject: PathsAPI): UseQueryResult {
    const path = dataObject + id

    return getData(path, path + '/')
}


type skip = number
type limit = number

export function getDataObjects(
    dataObject: PathsAPI,
    skip: skip,
    limit: limit = 10,
): UseQueryResult {
    const path = dataObject + `?${Pagination.SKIP}=${skip}/?${Pagination.LIMIT}=${limit}`

    return getData(path, path)
}
