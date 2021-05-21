import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//Common text field to be used at the login,signup form
const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            //Funcitonality of the visibility option at the password field
            InputProps={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        {/*Setting the visibility*/}
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            } : null}
        />
    </Grid>
);

export default Input;