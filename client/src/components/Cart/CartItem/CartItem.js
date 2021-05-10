import React, { useState } from "react";
import styles from "./CartItem.module.css";

import {connect, useDispatch} from "react-redux";
import {
    addToCart,
    adjustItemQty,
    removeFromCart,
} from "../../../actions/shopping-actions";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import moment from "moment";
import useStyles from "../../Posts/Post/styles";

const CartItem = ({ item, adjustQty, removeFromCart}) => {
    const [input, setInput] = useState(item.qty);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const onChangeHandler = (e) => {
        setInput(e.target.value);
        adjustQty(item._id, e.target.value);
    };

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={item.selectedFile} title={item.item}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{item.name}</Typography>
            </div>
            <CardActions className={classes.cardActions}>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{item.item}</Typography>
            </CardActions>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">Rs. {item.price}</Typography>
            </div>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component={"p"}>{item.description}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={styles.cartItem__actions}>
                    <div className={styles.cartItem__qty}>
                        <label htmlFor="qty">Qty</label>
                        <input
                            min="1"
                            type="number"
                            id="qty"
                            name="qty"
                            value={input}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className={styles.actions__deleteItemBtn}>
                        <img src="https://image.flaticon.com/icons/svg/709/709519.svg" alt=""/>
                    </button>
                </div>
            </CardActions>
        </Card>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        adjustQty: (id, value) => dispatch(adjustItemQty(id, value)),
        removeFromCart: (id) => dispatch(removeFromCart(id)),
    };
};

export default connect(null, mapDispatchToProps)(CartItem);