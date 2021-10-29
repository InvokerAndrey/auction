import { 
    AUCTION_LIST_REQUEST,
    AUCTION_LIST_SUCCESS,
    AUCTION_LIST_FAIL,
 } from '../constants/auctionConstants'


 export const auctionListReducer = (state = {auctions: []}, action) => {
    switch(action.type) {
        case AUCTION_LIST_REQUEST:
            return {loading: true, auctions: []}

        case AUCTION_LIST_SUCCESS:
            return {
                loading: false,
                auctions: action.payload.results,
                page: action.payload.page,
                previous: action.payload.previous,
                next: action.payload.next,
                count: action.payload.count
            }

        case AUCTION_LIST_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
 }