import { ADD_TO_CART, REMOVE_FROM_CART, ADJUST_ITEM_QTY, LOAD_CURRENT_ITEM } from "../constants/shopping-types";
import * as api from "../api";


export const addToCart = (item) => async (dispatch) =>{

    console.log(item);

        try{
            dispatch({
                type: ADD_TO_CART,
                payload: item
            });
        }catch(error){
            console.log(error);
        }


        // type: actionTypes.ADD_TO_CART,
        // payload: {
        //     id: itemID,
        // },

};

export const removeFromCart = (itemID) => {
    return {
        type: REMOVE_FROM_CART,
        payload: {
            id: itemID,
        },
    };
};

export const adjustItemQty = (itemID, qty) => {
    return {
        type: ADJUST_ITEM_QTY,
        payload: {
            id: itemID,
            qty,
        },
    };
};

export const loadCurrentItem = (item) => {
    return {
        type: LOAD_CURRENT_ITEM,
        payload: item,
    };
};