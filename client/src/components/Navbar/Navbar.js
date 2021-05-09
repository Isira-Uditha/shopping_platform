import React, {useState , useEffect} from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link ,  useHistory , useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import memories from "../../images/memories.png";
import decode from 'jwt-decode';
import useStyles from "./styles";
import * as actionType from "../../constants/actionTypes";

const Navbar = () =>{
   const classes = useStyles();


   return(
       <AppBar className={classes.appBar} position="static" color="inherit">
          <div className={classes.brandContainer}>
             <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
             <img className={classes.image} src={ memories} alt="memories" height="60"/>
          </div>
          <Toolbar className ={classes.toolbar}>

                 <Button  variant="contained" color="primary">Sign In</Button>

          </Toolbar>


       </AppBar>
   )
}

export default Navbar;

