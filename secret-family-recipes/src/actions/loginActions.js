import { axiosWithAuth } from '../utils/axiosWithAuth.js'


export const POST_LOGIN_START = 'POST_LOGIN_START';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILURE';


//makes a call to backend api and returns a toekn on success
export const postLogin = (credentials, match) => dispatch =>{
    
    dispatch({type:POST_LOGIN_START});
    axiosWithAuth()
    .post('/auth/login',credentials)
    .then(res =>{
        dispatch({type:POST_LOGIN_SUCCESS, payload: res.data});
        localStorage.setItem('token', JSON.stringify(res.data.token));
        match.push(`/recipes`)
    })
    .catch(err =>{
        dispatch({type:POST_LOGIN_FAILURE, payload: err})
    })
}

