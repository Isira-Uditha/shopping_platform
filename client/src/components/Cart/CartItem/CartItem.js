import React, { useState } from "react";
import styles from "./CartItem.module.css";
import { connect } from "react-redux";
import {
    adjustItemQty,
    removeFromCart,
} from "../../../actions/shopping-actions"

const CartItem = ({itemData , removeFromCart , adjustQty }) => {

    const [input, setInput] = useState(itemData.qty);

    //Incrementing the quantity of the selected item
    const onChangeHandler = (e) => {
       console.log(e.target.value);
        setInput(e.target.value);
       adjustQty(itemData._id, e.target.value);
    };

    return (
        <div className={styles.cartItem}>

            <img
                className={styles.cartItem__image}
                src={itemData.selectedFile}
                alt={itemData.item}
            />

            <div className={styles.cartItem__details}>
                <p className={styles.details__title}>  {itemData.item}</p>
                <p className={styles.details__desc}>{itemData.description}</p>
                <p className={styles.details__price}>Rs.{itemData.price} </p>
            </div>
            <div className={styles.cartItem__actions}>
                <div className={styles.cartItem__qty}>
                    <label htmlFor="qty">Qty</label>
                    <input
                        min="1"
                        type="number"
                        id="qty"
                        name="qty"
                        value = {input}
                        onChange={onChangeHandler}
                    />
                </div>

                <button
                    onClick={() => removeFromCart(itemData._id)}
                    className={styles.actions__deleteItemBtn}
                >
                    <img
                        src="https://image.flaticon.com/icons/svg/709/709519.svg"
                        alt=""
                    />
                </button>
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