import { Status } from '@/enums'
import { IObjectCommon } from '@/models'
import { Any, ILike, In } from 'typeorm'

export const covertObjectQuery = (query: IObjectCommon, queryKeys: string[]) => {
    const booleans = ['true', 'false']

    const objectBoolean: IObjectCommon = {
        true: true,
        false: false,
    }

    return queryKeys.reduce((obj: IObjectCommon, k: string) => {
        obj[k] = booleans.includes(query[k] as string)
            ? objectBoolean[query[k] as string]
            : query[k]
        return obj
    }, {})
}

export const excludeQuery = (query: IObjectCommon) => {
    const otherQuery = ['limit', 'page', 'search', 'hashTag']
    const queryKeys = Object.keys(query).filter((q) => !otherQuery.includes(q))

    const newQuery = covertObjectQuery(query, queryKeys)

    return Object.keys(newQuery).length > 0 ? newQuery : null
}

export const filtersQuery = (query: IObjectCommon) => {
    const sortList = ['ASC', 'DESC']
    const excludeQueryKey = excludeQuery(query)
    if (!excludeQueryKey) return {}

    const queryKeys = Object.keys(excludeQueryKey).filter(
        (q) => !sortList.includes(query[q].toString())
    )
    const newQuery = covertObjectQuery(query, queryKeys)

    return Object.keys(newQuery).length > 0 ? newQuery : {}
}

export const sortQuery = (query: IObjectCommon) => {
    if (Object.keys(query).length === 0) return null

    const excludeQueryKey = excludeQuery(query)
    if (!excludeQueryKey) return { createdAt: 'DESC' }

    const queryKeys = Object.keys(excludeQueryKey).filter(
        (k) => query[k] === Status.ASC || query[k] === Status.DESC
    )

    const newQuery = covertObjectQuery(query, queryKeys)

    return Object.keys(newQuery).length > 0 ? newQuery : { createdAt: 'DESC' }
}

export const paginationQuery = (query: IObjectCommon) => {
    if (Object.keys(query).length === 0) return { take: 5, skip: 0 }

    const otherQuery = ['limit', 'page']
    const queryKeys = Object.keys(query).filter((q) => otherQuery.includes(q))

    const newQuery = covertObjectQuery(query, queryKeys)

    const take = +newQuery.limit || 5
    const skip = (+newQuery.page - 1) * take

    return {
        take,
        skip,
    }
}

export const searchQuery = (query: IObjectCommon, key: string) => {
    if (!query.search || !key) return {}

    const newQuery = {
        [key]: ILike(`%${query.search}%`),
    }

    return newQuery
}

export const filtersArrQuery = (query: IObjectCommon) => {
    const arrFilters = ['hashTag']

    const queryKeys = Object.keys(query).filter((k) => arrFilters.includes(k))
    return queryKeys.reduce((obj: IObjectCommon, k: string) => {
        obj[`${k}Ids`] = In([typeof +query[k] === 'number' ? +query[k] : query[k]])
        return obj
    }, {})
}
