import mongoose from "mongoose";

const orderSchema = mongoose.Schema({

    creator: String,
    totalPrice: String,
    totalItems: String,
    cart: {
        type: [String],
        default: []
    },
    cardNumber : String,
    eDate : String,
    cvc : String,
    cardName : String,
    createdAt: {
        type: Date,
        default: new Date()
    }
    ,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;