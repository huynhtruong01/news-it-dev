"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filtersArrQuery = exports.searchQuery = exports.paginationQuery = exports.sortQuery = exports.filtersQuery = exports.excludeQuery = exports.covertObjectQuery = void 0;
const enums_1 = require("../enums");
const typeorm_1 = require("typeorm");
const covertObjectQuery = (query, queryKeys) => {
    const booleans = ['true', 'false'];
    const objectBoolean = {
        true: true,
        false: false,
    };
    return queryKeys.reduce((obj, k) => {
        obj[k] = booleans.includes(query[k])
            ? objectBoolean[query[k]]
            : query[k];
        return obj;
    }, {});
};
exports.covertObjectQuery = covertObjectQuery;
const excludeQuery = (query) => {
    const otherQuery = ['limit', 'page', 'search', 'hashTag'];
    const queryKeys = Object.keys(query).filter((q) => !otherQuery.includes(q));
    const newQuery = (0, exports.covertObjectQuery)(query, queryKeys);
    return Object.keys(newQuery).length > 0 ? newQuery : null;
};
exports.excludeQuery = excludeQuery;
const filtersQuery = (query) => {
    const sortList = ['ASC', 'DESC'];
    const excludeQueryKey = (0, exports.excludeQuery)(query);
    if (!excludeQueryKey)
        return {};
    const queryKeys = Object.keys(excludeQueryKey).filter((q) => !sortList.includes(query[q].toString()));
    const newQuery = (0, exports.covertObjectQuery)(query, queryKeys);
    return Object.keys(newQuery).length > 0 ? newQuery : {};
};
exports.filtersQuery = filtersQuery;
const sortQuery = (query) => {
    if (Object.keys(query).length === 0)
        return null;
    const excludeQueryKey = (0, exports.excludeQuery)(query);
    if (!excludeQueryKey)
        return { createdAt: 'DESC' };
    const queryKeys = Object.keys(excludeQueryKey).filter((k) => query[k] === enums_1.Status.ASC || query[k] === enums_1.Status.DESC);
    const newQuery = (0, exports.covertObjectQuery)(query, queryKeys);
    return Object.keys(newQuery).length > 0 ? newQuery : { createdAt: 'DESC' };
};
exports.sortQuery = sortQuery;
const paginationQuery = (query) => {
    if (Object.keys(query).length === 0)
        return { take: 5, skip: 0 };
    const otherQuery = ['limit', 'page'];
    const queryKeys = Object.keys(query).filter((q) => otherQuery.includes(q));
    const newQuery = (0, exports.covertObjectQuery)(query, queryKeys);
    const take = +newQuery.limit || 5;
    const skip = (+newQuery.page - 1) * take;
    return {
        take,
        skip,
    };
};
exports.paginationQuery = paginationQuery;
const searchQuery = (query, key) => {
    if (!query.search || !key)
        return {};
    const newQuery = {
        [key]: (0, typeorm_1.ILike)(`%${query.search}%`),
    };
    return newQuery;
};
exports.searchQuery = searchQuery;
const filtersArrQuery = (query) => {
    const arrFilters = ['hashTag'];
    const queryKeys = Object.keys(query).filter((k) => arrFilters.includes(k));
    return queryKeys.reduce((obj, k) => {
        let newQuery = [];
        if (typeof +query[k] === 'number') {
            newQuery = [+query[k]];
        }
        if (typeof query[k] === 'string') {
            newQuery = query[k].split(',').map((k) => +k);
        }
        obj[`${k}Ids`] = (0, typeorm_1.In)(newQuery);
        return obj;
    }, {});
};
exports.filtersArrQuery = filtersArrQuery;
