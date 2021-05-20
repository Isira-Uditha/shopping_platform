import * as api from "../api";
import {CREATE_ORDER} from "../constants/actionTypes";

export const createOrder = (order) => async (dispatch) =>{
    try{
        console.log("Inside order in ACTIONS");
        // console.log(order);
        const { data } = await api.createOrder(order);
        dispatch({type:CREATE_ORDER , payload:data});

    }catch (error) {
        console.log(error);
    }
}