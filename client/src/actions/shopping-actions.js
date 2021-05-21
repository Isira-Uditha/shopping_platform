import { ADD_TO_CART, REMOVE_FROM_CART, ADJUST_ITEM_QTY, LOAD_CURRENT_ITEM } from "../constants/shopping-types";


//This function is used to add an item into the shopping cart
export const addToCart = (itemID) => async (dispatch) =>{
        try{
            dispatch({ type: ADD_TO_CART, payload: itemID });
        }catch(error){
            console.log(error);
        }
};

//This function is used to remove an item into the shopping cart
export const removeFromCart = (itemID) => async (dispatch) => {
   try{
       dispatch({ type: REMOVE_FROM_CART, payload: itemID });

    }catch(error){
       console.log(error);
   }
};

//This function is used to count and display the items added to the cart
export const adjustItemQty = (itemID, qty) => {
    return {
        type: ADJUST_ITEM_QTY,
        payload: {
            id: itemID,
            qty,
        },
    };
};

//This function is used to load the added cart items into the checkout page
export const loadCurrentItem = (item) => async (dispatch) => {
    try{
        dispatch({ type:LOAD_CURRENT_ITEM, payload:item});
    }catch(error){
        console.log(error);
    }
};