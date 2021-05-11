import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, ADD_TO_CART } from '../constants/actionTypes';
import * as actionTypes from "../constants/shopping-types";



export default (posts = [], action) => {

    // const INITIAL_STATE = {posts , cart : [] ,  currentItem: null,};

    switch (action.type) {
        case UPDATE:
        case LIKE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            console.log(posts);
            return [...posts, action.payload];
        case DELETE:

            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
}