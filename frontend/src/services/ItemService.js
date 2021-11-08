import axios from 'axios'
import { 
    ITEM_LIST_REQUEST,
    ITEM_LIST_SUCCESS,
    ITEM_LIST_FAIL,
 } from '../constants/itemConstants'


export default class ItemService {
    BASE_URL = 'api/item/'
    LIST_URL = this.BASE_URL + 'list/'

    listItems = (params={}) => async (dispatch) => {
        try{
            dispatch({
                type: ITEM_LIST_REQUEST
            })
    
            const {data} = await axios.get(this.LIST_URL, params)
            
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
}
