import { 
    AUCTION_LIST_REQUEST,
    AUCTION_LIST_SUCCESS,
    AUCTION_LIST_FAIL,

    AUCTION_DETAIL_REQUEST,
    AUCTION_DETAIL_SUCCESS,
    AUCTION_DETAIL_FAIL,
 } from '../constants/auctionConstants'

import {
    OFFER_MAKE_REQUEST,
    OFFER_MAKE_SUCCESS,
    OFFER_MAKE_FAIL,

    OFFER_LIST_REQUEST,
    OFFER_LIST_SUCCESS,
    OFFER_LIST_FAIL,
 } from '../constants/offerConstants'


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


 export const auctionDetailReducer = (state = { auction:{lot:{item:{}}} }, action) => {
    switch(action.type) {
        case AUCTION_DETAIL_REQUEST:
            return {loading: true, ...state};

        case AUCTION_DETAIL_SUCCESS:
            return {loading: false, auction: action.payload}

        case AUCTION_DETAIL_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}


 export const offerMakeReducer = (state = {}, action) => {
    switch(action.type) {
        case OFFER_MAKE_REQUEST:
            return {loading: true, ...state};

        case OFFER_MAKE_SUCCESS:
            return {loading: false, success: true}

        case OFFER_MAKE_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}


export const recentOfferListReducer = (state = {offers: []}, action) => {
    switch(action.type) {
        case OFFER_LIST_REQUEST:
            return {loading: true, offers: []}

        case OFFER_LIST_SUCCESS:
            return {loading: false, offers: action.payload}

        case OFFER_LIST_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}


 export const buyItNowReducer = (state = {}, action) => {
    switch(action.type) {
        case OFFER_MAKE_REQUEST:
            return {loading: true, ...state};

        case OFFER_MAKE_SUCCESS:
            return {loading: false, success: true}

        case OFFER_MAKE_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}
