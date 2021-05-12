import React, {useEffect, useState } from 'react';
import { Link,useHistory, useLocation } from 'react-router-dom';
import {AppBar, Typography, Toolbar, Avatar, Button} from "@material-ui/core";
import useStyles from './styles';
import styles from "./Navbar.module.css";
import memories from "../../images/memories.png";
import decode from 'jwt-decode';
import {useDispatch, useSelector} from 'react-redux';
import * as actionType from '../../constants/actionTypes';
import { connect } from "react-redux";
import {adjustItemQty, removeFromCart} from "../../actions/shopping-actions"

const Navbar = ({cart, removeFromCart}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    // const cart = useSelector((state) => state.cart)
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const [cartCount, setCartCount] = useState(0);

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        history.push('/auth');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }else{
            setCartCount(0);
            cart.forEach((item) => {
                removeFromCart(item._id);
            });
        }

        setUser(JSON.parse(localStorage.getItem('profile')));




    }, [location,cart]);

    useEffect(() => {
        let count = 0;
        cart.forEach((item) => {
            count += item.qty;
        });

        const token = user?.token;

        if (token) {
            setCartCount(count);
        }

    }, [cart, cartCount]);




    return (
        <div className={classes.appBar} position="static" color="inherit">
            <AppBar className={classes.appBar} position="static">
                <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center">Shopping Platform</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
                <Toolbar className={classes.toolbar}>
                    {user?.result ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>
                                {user?.result.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant="h6">
                                {user?.result.name}
                            </Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
                                Logout
                            </Button>
                            <Link to="/cart">
                                <div className={styles.navbar__cart}>
                                    <h3 className={styles.cart__title}>Cart</h3>
                                    <img
                                        className={styles.cart__image}
                                        src="https://image.flaticon.com/icons/svg/102/102276.svg"
                                        alt="shopping cart"
                                    />
                                    <div className={styles.cart__counter}>{cartCount}</div>
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        cart: state.shop.cart,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeFromCart: (id) => dispatch(removeFromCart(id)),
    };
};


//export default Navbar;
export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
