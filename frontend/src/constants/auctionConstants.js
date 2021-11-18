export const AUCTION_LIST_REQUEST = 'AUCTION_LIST_REQUEST'
export const AUCTION_LIST_SUCCESS = 'AUCTION_LIST_SUCCESS'
export const AUCTION_LIST_FAIL = 'AUCTION_LIST_FAIL'

export const AUCTION_DETAIL_REQUEST = 'AUCTION_DETAIL_REQUEST'
export const AUCTION_DETAIL_SUCCESS = 'AUCTION_DETAIL_SUCCESS'
export const AUCTION_DETAIL_FAIL = 'AUCTION_DETAIL_FAIL'

export const AUCTION_BUY_IT_NOW_REQUEST = 'AUCTION_BUY_IT_NOW_REQUEST'
export const AUCTION_BUY_IT_NOW_SUCCESS = 'AUCTION_BUY_IT_NOW_SUCCESS'
export const AUCTION_BUY_IT_NOW_FAIL = 'AUCTION_BUY_IT_NOW_FAIL'


class Enum {
    static obj = {}

    static getVerboseById(id) {
        for (let attr in this.obj) {
            if (this.obj.hasOwnProperty(attr) && this.obj[attr].id === id) {
                return this.obj[attr].verbose
            }
        }
        return null
    }

    static getIdList() {
        let idList = []
        for (let attr in this.obj) {
            if (this.obj.hasOwnProperty(attr)) {
                idList.push(this.obj[attr].id)
            }
        }
        return idList
    }
}


export class StatusEnum extends Enum {
    static obj = {
        PENDING: {id: 1, verbose: 'pending...'},
        IN_PROGRESS: {id: 2, verbose: 'in progress'},
        CLOSED: {id: 3, verbose: 'closed'},
    }

    static get PENDING() {
        return this.obj.PENDING.id
    }

    static get IN_PROGRESS() {
        return this.obj.IN_PROGRESS.id
    }

    static get CLOSED() {
        return this.obj.CLOSED.id
    }
}


export class TypeEnum extends Enum {
    static obj = {
        ENGLISH: {id: 1, verbose: 'TEA'},
        DUTCH: {id: 2, verbose: 'WEED'},
    }

    static get ENGLISH() {
        return this.obj.ENGLISH.id
    }

    static get DUTCH() {
        return this.obj.DUTCH.id
    }
}
