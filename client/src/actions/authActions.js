import { axios } from 'axios';
import { returnErrors } from "./errorActions";

import { 
    USER_LOADED, 
    USER_LOADING, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT_SUCCESS, 
    REGISTER_SUCCESS, 
    REGISTER_FAIL 
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    const token = getState().auth.token;

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    if(token) {
        config.headers['x-auth-token'] = token;
    }

    axios.get('/api/auth/user', config)
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        });

    axios.get('/api/auth/user', token)
}