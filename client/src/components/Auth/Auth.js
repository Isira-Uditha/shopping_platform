import React, { useState } from 'react'
import {Avatar, Button, Container, Grid, Paper, TextField, Typography} from "@material-ui/core";
import {LockOpenOutlined} from "@material-ui/icons";
import useStyles from './styles';
import Input from './Input';
import {useDispatch} from "react-redux";
import { useHistory } from 'react-router-dom';
import GoogleLogin from "react-google-login";
import Icon from './icon';
import { AUTH } from '../../constants/actionTypes';
import { signin, signup } from '../../actions/auth';

//Initializing user details
const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
};


const Auth = () => {

    const classes = useStyles(); //Assigning imported styles of material ui library
    const [showPassword, setShowPassword] = useState(false); //getting a state to store boolean value of show or hide password
    const handleShowPassword = () => setShowPassword(!showPassword); //handling the show password effect in the password field
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    //Action has to be taken according to user selection (whether sign up or sign in)
    const handleSubmit = (e) => {
        e.preventDefault(); //prevent a browser reload or refresh
        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    }

    //
    const handleChange = (e) => {
        setForm({...formData, [e.target.name]: e.target.value});
    }

    //handle the sign in and sign up texts at the bottom of the login form
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    //Execute after a successful google login
    const googleSuccess = async (res) => {
        const result = res?.profileObj; //assigning profile object to result
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token } });
            history.push('/');

        } catch (error) {
            console.log(error);
        }
    };

    //Execute for a particular error occurred in the google login
    const googleError = () => {
        alert('Google Sign In was unsuccessful. Try again later');
    }

    return (
    <Container componenet="main" maxWidth="xs" >
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                {/*Importing lock icon from the material ui*/}
                <LockOpenOutlined/>
            </Avatar>
        <Typography varient="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            {/*Login or Signup form*/}
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    { isSignup &&
                    <Input name="address" label="Postal Address" handleChange={handleChange} type="text" />
                    }
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    {/*If user performing a signup, show confirm password*/}
                    { isSignup &&
                        <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                    }
                </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                <GoogleLogin
                    // obtaining google login service
                    clientId="151708512341-vbuvik13i2mpmleeh8o9tnauntljp9qg.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                            Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                />
            <Grid container justify="flex-end">
                <Grid item>
                    <Button onClick={switchMode}>
                        { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                    </Button>
                </Grid>
            </Grid>
            </form>
        </Paper>
    </Container>
    );
};

export default Auth;