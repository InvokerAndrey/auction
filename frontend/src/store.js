import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { 
    itemListReducer
} from './reducers/itemReducers'

import { 
    lotListReducer
} from './reducers/lotReducers'

import { 
    auctionListReducer,
    auctionDetailReducer,
    offerMakeReducer,
    recentOfferListReducer,
} from './reducers/auctionReducers'

import { 
    userLoginReducer
} from './reducers/userReducers'


const reducer = combineReducers({
    itemList: itemListReducer,
    lotList: lotListReducer,
    auctionList: auctionListReducer,
    userLogin: userLoginReducer,
    auctionDetail: auctionDetailReducer,
    offerMake: offerMakeReducer,
    recentOfferList: recentOfferListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
