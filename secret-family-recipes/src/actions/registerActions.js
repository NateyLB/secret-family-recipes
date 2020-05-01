import { axiosWithAuth } from '../utils/axiosWithAuth.js'

export const POST_REGISTER_START = 'POST_REGISTER_START';
export const POST_REGISTER_SUCCESS = 'POST_REGISTER_SUCCESS';
export const POST_REGISTER_FAILURE = 'POST_REGISTER_FAILURE';

//makes a call to backend api and registers a user
export const postRegister = (credentials) => dispatch =>{
    dispatch({type:POST_REGISTER_START});
    axiosWithAuth()
    .post('/auth/register',credentials)
    .then(res =>{
        console.log(res.data)
        dispatch({type:POST_REGISTER_SUCCESS, payload: res.data});
    })
    .catch(err =>{
        dispatch({type:POST_REGISTER_FAILURE, payload: err})
    })
}
