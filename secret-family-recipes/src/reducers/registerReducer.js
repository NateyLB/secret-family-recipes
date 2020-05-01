import {
    POST_REGISTER_START, 
    POST_REGISTER_SUCCESS, 
    POST_REGISTER_FAILURE, 
  } from '../actions/registerActions.js'
  
  export const intialState = {
    token:'',
    isPosting: false,
    error: ''
    };
  
    //handles REGISTER actions, puts an auth token in local storage
    export const registerReducer = (state=intialState, action) =>{
      switch (action.type){
        case POST_REGISTER_START:
          console.log('POST_REGISTER_START')
          return{...state, isPOSTing: true}
        case POST_REGISTER_SUCCESS:
          console.log('POST_REGISTER_SUCCESS')
          return{...state, isPOSTing:false, url:action.payload.url, error:""}
        case POST_REGISTER_FAILURE:
          console.log('POST_REGISTER_ERROR')
          return{...state, isPOSTing:false, error: action.payload}
  
        
      
          
          default:
              return state;
      }
    }