import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import {connect, useDispatch} from "react-redux";
import {Avatar, Chip, Grid} from "@material-ui/core";
import CartItem from "./CartItem/CartItem";
import {createOrder} from "../../actions/orders";
import {TextField, Button} from "@material-ui/core";
import Input from "../Auth/Input";
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
    const [cardPayment, setCardPayment ] = useState(false);
    const [mobilePayment, setMobilePayment ] = useState(false);
    const [courierDHL, setCourierDhl ] = useState(false);
    const [courierKAPRUKA, setCourierKapruka ] = useState(false);
    const [courierDOMEX, setCourierDomex ] = useState(false);
    const [deliveryOption, setDeliveryOption ] = useState("DHL");
    const history = useHistory();
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

    const chooseCard = (id) =>{
        switch(id){
            case 1:
                setCardPayment(true);
                setMobilePayment(false);
                break;
            case 2:
                setCardPayment(false);
                setMobilePayment(true);
                break;
            default:
                setCardPayment(false);
                setMobilePayment(false);
        }

    }

    const chooseDeliver = (id) =>{
        const deliveryOption = '';
        switch(id){
            case 1:
                setCourierDhl(true);
                setCourierKapruka(false);
                setCourierDomex(false);
                setDeliveryOption('DHL');
                break;
            case 2:
                setCourierDhl(false);
                setCourierKapruka(true);
                setCourierDomex(false);
                setDeliveryOption('KAPRUKA');
                break;
            case 3:
                setCourierDhl(false);
                setCourierKapruka(false);
                setCourierDomex(true);
                setDeliveryOption('DOMEX');
                break;
            default:
                setCourierDhl(false);
                setCourierKapruka(false);
                setCourierDomex(false);
                setDeliveryOption('DHL');
        }

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user);

        const cardName = formData["cardName"];
        const cvc  = formData["cvc"];
        const eDate = formData["eDate"];
        const cardNumber = formData["cardNumber"];
        const mobileNumber = formData["mobileNumber"];

        dispatch(createOrder({ cart, totalItems, totalPrice,name: user?.result?.name ,email: user?.result?.email,address: user?.result?.address,cardNumber, eDate, cvc, cardName, mobileNumber}));
        history.push('/');
        Swal.fire(
            'Order Placed!',
            'You order will be delivered by '+`${deliveryOption}`,
            'success'
        )

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
                {
                    cardPayment && (
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
                    )
                }
                {
                    mobilePayment && (
                        <div>
                            <Grid container spacing={2}>
                                <Input name={"mobileNumber"} variant={"outlined"} label={"Mobile Number"}  handleChange={handleChange} fullWidth />
                            </Grid>
                        </div>
                    )
                }
                <div className={"text-center"}><br/>
                    <Grid container spacing={2} >
                        <>
                            <Grid item xs={6}>
                                <Button size="small" variant="outlined" color="primary" onClick={() => chooseCard(1)}>Pay with Card</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button size="small" variant="outlined" color="primary" onClick={() => chooseCard(2)}>Pay with Mobile</Button>
                            </Grid>
                        </>
                    </Grid>
                </div><br/>
                {
                    courierDHL && (
                        <div>
                            <Chip size="small" avatar={<Avatar>D</Avatar>}  color="primary" label="You Have Selected : DHL" />
                        </div>
                    )
                }
                {
                    courierKAPRUKA && (
                        <div>
                            <Chip size="small" avatar={<Avatar>K</Avatar>} color="primary" label="You Have Selected : KAPRUKA" />
                        </div>
                    )
                }
                {
                    courierDOMEX && (
                        <div>
                            <Chip size="small" avatar={<Avatar>DX</Avatar>} color="primary" label="You Have Selected : DOMEX" />
                        </div>
                    )
                }

                <div className={"text-center"}><br/>
                    <Grid container spacing={2} >
                        <>
                            <Grid item xs={4}>
                                <Button size="small" variant="outlined" color="primary" onClick={() => chooseDeliver(1)}>Courier By DHL</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button size="small" variant="outlined" color="primary" onClick={() => chooseDeliver(2)}>Courier By KAPRUKA</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button size="small" variant="outlined" color="primary" onClick={() => chooseDeliver(3)}>Courier By DOMEX</Button>
                            </Grid>
                        </>
                    </Grid>
                </div>

                <br/><br/>
                <Button variant="contained" type="submit" color="primary" >
                    Proceed To Checkout
                </Button>
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