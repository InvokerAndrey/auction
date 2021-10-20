import { 
    LOT_LIST_REQUEST,
    LOT_LIST_SUCCESS,
    LOT_LIST_FAIL,
 } from '../constants/lotConstants'


 export const lotListReducer = (state = {lots: []}, action) => {
    switch(action.type) {
        case LOT_LIST_REQUEST:
            return {loading: true, lots: []}

        case LOT_LIST_SUCCESS:
            return {
                loading: false,
                lots: action.payload.results,
                page: action.payload.page,
                previous: action.payload.previous,
                next: action.payload.next,
                count: action.payload.count
            }

        case LOT_LIST_FAIL:
            return {loading: false, error: action.payload}
        
        default:
            return state
    }
 }