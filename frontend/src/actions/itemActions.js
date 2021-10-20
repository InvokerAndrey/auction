import axios from 'axios'
import { 
    ITEM_LIST_REQUEST,
    ITEM_LIST_SUCCESS,
    ITEM_LIST_FAIL,
 } from '../constants/itemConstants'


export const listItems = (params={}) => async (dispatch) => {
    try{
        dispatch({
            type: ITEM_LIST_REQUEST
        })

        const {data} = await axios.get(`/api/item/list/`, params)
        
        dispatch({
            type: ITEM_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ITEM_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                    : error.message,
        })
    }
} 