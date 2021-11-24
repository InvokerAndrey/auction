import axios from 'axios'
import { 
    LOT_LIST_REQUEST,
    LOT_LIST_SUCCESS,
    LOT_LIST_FAIL,
 } from '../constants/lotConstants'


export default class LotService {
    BASE_URL = 'api/lot/'
    LIST_URL = this.BASE_URL + 'list/'

    listLots = (params={}) => async (dispatch) => {
        try{
            dispatch({type: LOT_LIST_REQUEST})
            const {data} = await axios.get(this.LIST_URL, params)
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
}
