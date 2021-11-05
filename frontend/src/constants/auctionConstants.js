export const AUCTION_LIST_REQUEST = 'AUCTION_LIST_REQUEST'
export const AUCTION_LIST_SUCCESS = 'AUCTION_LIST_SUCCESS'
export const AUCTION_LIST_FAIL = 'AUCTION_LIST_FAIL'

export const AUCTION_DETAIL_REQUEST = 'AUCTION_DETAIL_REQUEST'
export const AUCTION_DETAIL_SUCCESS = 'AUCTION_DETAIL_SUCCESS'
export const AUCTION_DETAIL_FAIL = 'AUCTION_DETAIL_FAIL'

export const STATUS = {
    1: 'PENDING',
    2: 'IN PROGRESS',
    3: 'CLOSED',
}

export const TYPE = {
    1: 'ENGLISH',
    2: 'DUTCH',
}

export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value)
}