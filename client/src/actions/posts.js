import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, ADD_TO_CART , CREATE_ORDER  } from '../constants/actionTypes';
import * as api from '../api';

//This function used to retrieve posts to frontend
export const getPosts = () => async (dispatch) => {

    try{
        const { data } = await api.fetchPosts(); //Invoke API call to retrieve all item posts
        dispatch({ type: FETCH_ALL, payload: data });

    }catch (error){
        console.log(error);
    }
}

//This function is used to add new item post
export const createPost = (post) => async (dispatch) =>{
    try{
        const { data } = await api.createPost(post); //Invoke API call to create new post item
        dispatch({type:CREATE , payload:data});
    }catch (error) {
        console.log(error);
    }
}

//This function is used to edit an item post
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post); //Invoke API call to update post item
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

//This function is used to delete an item post
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id); //Invoke API call to delete post item
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

//This function is used to like an item post
export const likePost = (id) => async (dispatch) => {

    try {
        const { data } = await api.likePost(id); //Invoke API call to increase like count of a post item
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};


