import * as actionTypes from "../constants/shopping-types";

export const addToCart = (itemID) => {
    console.log('inside add to cart');
    return {

        type: actionTypes.ADD_TO_CART,
        payload: {
            id: itemID,
        },
    };
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