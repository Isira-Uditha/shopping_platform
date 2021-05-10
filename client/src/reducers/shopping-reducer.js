import * as actionTypes from "../constants/shopping-types";
import {useSelector} from "react-redux";



const INITIAL_STATE = {posts :[], cart : [] ,  currentItem: null,};
const shopReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            // Get Item data from products array
            const item = state.posts.find(
                (post) => post._id === action.payload._id

            );

            // Check if Item is in cart already
            const inCart = state.cart.find((item) =>
                item.id === action.payload._id ? true : false
            );

            return {
                ...state,
                cart: inCart
                    ? state.cart.map((item) =>
                        item.id === action.payload._id
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    )
                    : [...state.cart, { ...item, qty: 1 }],


            };

        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload._id),
            };
        case actionTypes.ADJUST_ITEM_QTY:
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.id === action.payload._id
                        ? { ...item, qty: +action.payload.qty }
                        : item
                ),
            };
        case actionTypes.LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload,
            };
        default:
            return state;
    }
};

export default shopReducer;

