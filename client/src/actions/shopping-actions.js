import { ADD_TO_CART, REMOVE_FROM_CART, ADJUST_ITEM_QTY, LOAD_CURRENT_ITEM ,  FETCH_ALL1 } from "../constants/shopping-types";
import * as api from "../api";
import {FETCH_ALL} from "../constants/actionTypes";


export const addToCart = (itemID) => async (dispatch) =>{
    // console.log(itemID);
    console.log('inside add to cart');

        try{
            console.log('xxxx');
            dispatch({ type: ADD_TO_CART, payload: itemID });
        }catch(error){
            console.log(error);
        }


        // type: actionTypes.ADD_TO_CART,
        // payload: {
        //     id: itemID,
        // },

};


export const removeFromCart = (itemID) => async (dispatch) => {
   try{
       dispatch({ type: REMOVE_FROM_CART, payload: itemID });

    }catch(error){
       console.log(error);
   }
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

export const loadCurrentItem = (item) => async (dispatch) => {

    try{
        dispatch({ type:LOAD_CURRENT_ITEM, payload:item});

    }catch(error){
        console.log(error);
    }

};