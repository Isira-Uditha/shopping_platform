import * as actionTypes from "../constants/shopping-types";
import * as api from "../api";
import {FETCH_ALL} from "../constants/actionTypes";

export const addToCart = (itemID) => (dispatch)=>{
    console.log('inside add to cart');


        try{

            dispatch({type: actionTypes.ADD_TO_CART, payload: itemID});

        }catch(error) {
            console.log(error);
        }


};

export const removeFromCart = (itemID) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: {
            id: itemID,
        },
    };
};

export const adjustItemQty = (itemID, qty) => {
    return {
        type: actionTypes.ADJUST_ITEM_QTY,
        payload: {
            id: itemID,
            qty,
        },
    };
};

export const loadCurrentItem = (item) => {
    return {
        type: actionTypes.LOAD_CURRENT_ITEM,
        payload: item,
    };
};