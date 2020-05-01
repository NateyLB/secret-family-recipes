
import {
  POST_LOGIN_START,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE
} from '../actions/loginActions.js'

import {
  GET_RECIPES_START,
  GET_RECIPES_SUCCESS,
  GET_RECIPES_FAILURE,
  POST_RECIPEHEADER_START,
  POST_RECIPEHEADER_SUCCESS,
  POST_RECIPEHEADER_FAILURE
} from '../actions/recipesActions.js'



export const initialState = {
  currentRecipeID: 0,
  recipeShape: {
    username: '',
    id: 0,
    user_id: '',
    recipeName: '',
    description: '',
    imageURL: '',
    prepTime: '',
    cookTime: '',
    yields: '',
    ingredients: [],
    directions: []
  },
  recipes: [],
  isGetting: false,
  isPosting: false,
  error: ''
};


//handles RECIPES actions, puts an auth token in local storage
export const recipesAndLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN_START:
      console.log('POST_LOGIN_START')
      return { ...state, isPosting: true, recipes:[] }
    case POST_LOGIN_SUCCESS:
      console.log('POST_LOGIN_SUCCESS')
      return { ...state, isPosting: false, recipeShape: { ...state.recipeShape, user_id: action.payload.loggedUser.id, username: action.payload.loggedUser.username }, error: "" }
    case POST_LOGIN_FAILURE:
      console.log('POST_LOGIN_ERROR', action.payload)
      return { ...state, isPosting: false, error: action.payload }


    case GET_RECIPES_START:
      console.log('GET_RECIPES_START')
      return { ...state, isGetting: true }
    case GET_RECIPES_SUCCESS:
      console.log('GET_RECIPES_SUCCESS')
      return { ...state, recipes: action.payload, isGetting: false, error: "" }
    case GET_RECIPES_FAILURE:
      console.log('GET_RECIPES_ERROR', action.payload)
      return { ...state, isGetting: false, error: action.payload }


    case POST_RECIPEHEADER_START:
      console.log('POST_RECIPEHEADER_START')
      return { ...state, isPosting: true }
    case POST_RECIPEHEADER_SUCCESS:
      console.log('POST_RECIPEHEADER_SUCCESS')
      return {
        ...state, recipeShape: {
          ...state.recipeShape,
          ...action.payload
        },
        recipes:[...state.recipes, action.payload],
        isPosting: false
      }
    case POST_RECIPEHEADER_FAILURE:
      console.log('POST_RECIPEHEADER_ERROR', action.payload)
      return { ...state, isPosting: false, error: action.payload }






    default:
      return state;
  }
}
