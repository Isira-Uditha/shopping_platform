import { combineReducers } from "redux";

import posts from './posts'
import auth from './auth'
import shop from './shopping-reducer'

export default combineReducers({ posts, auth , shop });