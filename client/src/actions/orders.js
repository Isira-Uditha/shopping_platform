import * as api from "../api";
import {CREATE_ORDER} from "../constants/actionTypes";

//This function is used to create a new order
export const createOrder = (order) => async (dispatch) =>{
    try{
        const { data } = await api.createOrder(order); //Invoke API call to create an order
        dispatch({type:CREATE_ORDER , payload:data});

    }catch (error) {
        console.log(error);
    }
}