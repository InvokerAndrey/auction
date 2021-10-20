import axios from 'axios'
import { 
    LOT_LIST_REQUEST,
    LOT_LIST_SUCCESS,
    LOT_LIST_FAIL,
 } from '../constants/lotConstants'


export const listLots = (params={}) => async (dispatch) => {
    try{
        dispatch({type: LOT_LIST_REQUEST})
        const {data} = await axios.get('/api/lot/list/', params)
        dispatch({
            type: LOT_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: LOT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                    : error.message,
        })
    }
} 