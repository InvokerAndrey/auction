import axios from 'axios'
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
 } from '../constants/userConstants'


export default class UserService {
    BASE_URL = 'api/users/'
    LOGIN_URL = this.BASE_URL + 'login/'

    login = (username, password) => async (dispatch) => {
        try {
            dispatch({
                type: USER_LOGIN_REQUEST
            })
    
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
    
            const {data} = await axios.post(
                this.LOGIN_URL,
                {
                    'username': username,
                    'password': password
                },
                config
            )
    
            localStorage.setItem('userInfo', JSON.stringify(data))
    
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
            })
        } catch (error) {
            
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }
    
    
    logout = () => (dispatch) => {
        localStorage.removeItem('userInfo')
    
        dispatch({
            type: USER_LOGOUT
        })
    }
}
