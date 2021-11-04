import axios from 'axios'
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
    OFFER_MAKE_FAIL
 } from '../constants/offerConstants'


export default class AuctionService {
    BASE_URL = 'http://127.0.0.1:8000/api/auction/'
    LIST_URL = this.BASE_URL + 'list/'

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
            console.log('123:', price)
            const {
                userLogin: {userInfo}
            } = getState()
            console.log('456:', userInfo)
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data} = await axios.post(
                this.BASE_URL + `${id}/make-offer/`,
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
}
