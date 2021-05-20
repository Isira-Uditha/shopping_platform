
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, ADD_TO_CART , CREATE_ORDER  } from '../constants/actionTypes';
import * as api from '../api';

//Action Creators

export const getPosts = () => async (dispatch) => {

    try{
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data });

    }catch (error){
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) =>{
    try{
        const { data } = await api.createPost(post);
        console.log(data);
        dispatch({type:CREATE , payload:data});
    }catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {

    try {
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const addToCart = (itemID) => {
    return {
        type: ADD_TO_CART,
        payload: {
            id: itemID,
        },
    };
};

export const createOrder = (order) => async (dispatch) =>{
    try{
        console.log("Inside order in ACTIONS");
        console.log(order);
        const { data } = await api.createOrder(order);
      dispatch({type:CREATE_ORDER , payload:data});

    }catch (error) {
        console.log(error);
    }
}

