import axios from 'axios'
import { 
    AUCTION_LIST_REQUEST,
    AUCTION_LIST_SUCCESS,
    AUCTION_LIST_FAIL,

    AUCTION_DETAIL_REQUEST,
    AUCTION_DETAIL_SUCCESS,
    AUCTION_DETAIL_FAIL,

    AUCTION_BUY_IT_NOW_REQUEST,
    AUCTION_BUY_IT_NOW_SUCCESS,
    AUCTION_BUY_IT_NOW_FAIL,
 } from '../constants/auctionConstants'

import {
    OFFER_MAKE_REQUEST,
    OFFER_MAKE_SUCCESS,
    OFFER_MAKE_FAIL,

    OFFER_LIST_REQUEST,
    OFFER_LIST_SUCCESS,
    OFFER_LIST_FAIL
 } from '../constants/offerConstants'


export default class AuctionService {
    BASE_URL = 'api/auction/'
    LIST_URL = this.BASE_URL + 'list/'
    MAKE_OFFER_URL = 'make-offer/'
    RECENT_OFFERS_URL = 'recent-offers/'
    BUY_IT_NOW_URL = 'buy-it-now/'

    listAuctions = (params={}) => async (dispatch) => {
        try {
            dispatch({type: AUCTION_LIST_REQUEST})
            
            const {data} = await axios.get(this.LIST_URL, params)
    
            dispatch({
                type: AUCTION_LIST_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: AUCTION_LIST_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    getAuctionDetail = (id) => async (dispatch) => {
        try {
            dispatch({type: AUCTION_DETAIL_REQUEST})

            const {data} = await axios.get(this.BASE_URL + `${id}/`)

            dispatch({
                type: AUCTION_DETAIL_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: AUCTION_DETAIL_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    makeOffer = (id, price) => async (dispatch, getState) => {
        try {
            dispatch({type: OFFER_MAKE_REQUEST})
            const {
                userLogin: {userInfo}
            } = getState()
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data} = await axios.post(
                this.BASE_URL + `${id}/` + this.MAKE_OFFER_URL,
                price,
                config
            )

            dispatch({type: OFFER_MAKE_SUCCESS})
        } catch (error) {
            dispatch({
                type: OFFER_MAKE_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }


    listRecentOffers = (id) => async (dispatch) => {
        try {
            dispatch({type: OFFER_LIST_REQUEST})

            const {data} = await axios.get(this.BASE_URL + `${id}/` + this.RECENT_OFFERS_URL)

            dispatch({
                type: OFFER_LIST_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: OFFER_LIST_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    buyItNow = (id) => async (dispatch, getState) => {
        try {
            dispatch({type: AUCTION_BUY_IT_NOW_REQUEST})
            const {
                userLogin: {userInfo}
            } = getState()
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data} = await axios.put(
                this.BASE_URL + `${id}/` + this.BUY_IT_NOW_URL,
                {},
                config
            )

            dispatch({
                type: AUCTION_BUY_IT_NOW_SUCCESS,
            })
        } catch (error) {
            dispatch({
                type: AUCTION_BUY_IT_NOW_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }
}
