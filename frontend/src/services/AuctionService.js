import axios from 'axios'
import { 
    AUCTION_LIST_REQUEST,
    AUCTION_LIST_SUCCESS,
    AUCTION_LIST_FAIL,
 } from '../constants/auctionConstants'


export default class AuctionService {
    BASE_URL = '/api/auction/'
    LIST_URL = this.BASE_URL + 'list/'

    listAuctions = (params={}) => async (dispatch) => {
        try{
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
}
