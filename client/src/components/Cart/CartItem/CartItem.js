import React, { useState } from "react";
import styles from "./CartItem.module.css";

import { connect } from "react-redux";
import {
    addToCart,
    adjustItemQty,
    removeFromCart,
} from "../../../actions/shopping-actions"
const CartItem = ({itemData}) => {


    return (
        <div className={styles.cartItem}>

            <div className={styles.cartItem__details}>
                <p className={styles.details__title}>  {itemData.item}</p>
                <p className={styles.details__desc}>{itemData.description}</p>
                <p className={styles.details__price}>${itemData.price} </p>
            </div>
            <div className={styles.cartItem__actions}>
                <div className={styles.cartItem__qty}>
                    <label htmlFor="qty">Qty</label>
                    <input
                        min="1"
                        type="number"
                        id="qty"
                        name="qty"
                        value = {itemData.qty}


                    />
                </div>

            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        adjustQty: (id, value) => dispatch(adjustItemQty(id, value)),
        removeFromCart: (id) => dispatch(removeFromCart(id)),
    };
};

export default connect(null, mapDispatchToProps)(CartItem);