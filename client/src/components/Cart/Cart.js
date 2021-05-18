import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";

import {connect, useDispatch} from "react-redux";
import {Grid} from "@material-ui/core";

import CartItem from "./CartItem/CartItem";
import {createPost, getPosts, updatePost , createOrder} from "../../actions/posts";
import {TextField} from "@material-ui/core";
import Input from "../Auth/Input";

const initialState = {
    cardName: '',
    cardNumber: '',
    cvc: '',
    eDate: ''
};


const Cart = ({ cart }) => {

    const [orderData, setOrderData] = useState({total_Price:'', total_Items:0,cartItems:''});
    const [formData, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

   /* useEffect(() => {
        dispatch(getPosts());
    },

        );*/

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        let items = 0;
        let price = 0;

        cart.forEach((item) => {
            items += item.qty;
            price += item.qty * item.price;
        });

        setTotalItems(items);
        setTotalPrice(price);
    }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        console.log(totalItems , totalPrice);
       // setOrderData(totalPrice , totalItems , cart);
      // setOrderData({  ...orderData , total_Price: "xxxxxxx"});
       /*
        setOrderData({ ...orderData, total_Items: totalItems});
        setOrderData({ ...orderData, cartItems: cart});*/

        const cardName = formData["cardName"];
        const  cvc  = formData["cvc"];
        const  eDate = formData["eDate"];
        const cardNumber = formData["cardNumber"];

       // console.log(cardName);

        dispatch(createOrder({ cart, totalItems, totalPrice,name: user?.result?.name ,cardNumber, eDate, cvc, cardName}));
     /*   if (!currentId) {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            clear();
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
        }*/

    };

    const handleChange = (e) => {
        setForm({...formData, [e.target.name]: e.target.value});
    }

    return (

        <form autoComplete="off" noValidate  onSubmit={handleSubmit}>
        <div className={styles.cart}>
            <div className={styles.cart__items}>
                {cart.map((item) => (
                    <CartItem  key={item.id} itemData={item}/>
                ))}
            </div>
            <div className={styles.cart__summary}>
                <h4 className={styles.summary__title}>Cart Summary</h4>
                <div className={styles.summary__price}>
                    <span>TOTAL: ({totalItems} items)</span>
                    <span>Rs {totalPrice}</span>
                </div>
                <br/><br/>

                <div>
                    <Grid container spacing={2}>
                        <Input name={"cardNumber"} variant={"outlined"} label={"Card Number"}  handleChange={handleChange} fullWidth />
                    <>
                        <Input name="eDate" label="MM/YY"  handleChange={handleChange} autoFocus half />
                        <Input name="cvc" label="CVC"   handleChange={handleChange} half />
                    </>
                        <Input name={"cardName"} variant={"outlined"} label={"Name on Card"}   handleChange={handleChange} fullWidth />
                    </Grid>
                </div>
                <br/><br/>
                    <button className={styles.summary__checkoutBtn}  type="submit" >
                    Proceed To Checkout
                </button>
            </div>
        </div>
        </form>


    );
};

const mapStateToProps = (state) => {
    return {
        cart: state.shop.cart,
    };
};

export default connect(mapStateToProps)(Cart);