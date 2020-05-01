import {combineReducers} from 'redux';

import { registerReducer } from './registerReducer.js'
import { recipesAndLoginReducer } from './recipesAndLoginReducer.js'


export default combineReducers({
    registerReducer,
    recipesAndLoginReducer
})