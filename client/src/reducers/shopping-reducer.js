import { ADD_TO_CART, REMOVE_FROM_CART, ADJUST_ITEM_QTY, LOAD_CURRENT_ITEM } from "../constants/shopping-types";

const INITIAL_STATE = {posts:[], cart : [] ,  currentItem: null,};

const shopReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            // Get Item data from products array
            const item = state.posts.find((post) => post._id === action.payload._id);

            // Check if Item is in cart already
            const inCart = state.cart.find((item) =>
                item._id === action.payload._id ? true : false
            );

            return {
                ...state,
                cart: inCart
                    ? state.cart.map((item) =>
                        item._id === action.payload._id
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    )
                    : [...state.cart, { ...item, qty: 1 }],
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item) => item._id !== action.payload._id),
            };
        case ADJUST_ITEM_QTY:
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item._id === action.payload._id
                        ? { ...item, qty: +action.payload.qty }
                        : item
                ),
            };
        case LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload,
            };
        default:
            return state;
    }
};

export default shopReducer;

