
import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData); //Invoke the API call to sign in an user

        dispatch({ type: AUTH, data });

        router.push('/'); //Redirect to home after user sign in
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData); //Invoke the API call to sign up an user

        dispatch({ type: AUTH, data });

        router.push('/'); //Redirect to home after user sign up
    } catch (error) {
        console.log(error);
    }
};