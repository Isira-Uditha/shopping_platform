import Item from "../models/item.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

export const createOrder = (req,res) => {

    const order = req.body;
    // console.log(order);
    const newOrder = new Order({ ...order, creator: req.userId, createdAt: new Date().toISOString() })
    console.log(newOrder);
    console.log(order.email);

    try {
        newOrder.save();

        let transporter = nodemailer.createTransport({
            host: "smtp.googlemail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'cybercocepts@gmail.com',
                pass: 'hiru1983XDM()'
            }
        });

        let mailOptions = {
            from: 'cybercocepts@gmail.com',
            to: "isirabandarafb@gmail.com",
            subject: 'Sending Email using Node.js',
            text: 'The seller has left feedback for your order no.' + `${newOrder._id}` +'.\n' +
                ' \n' +
                'Dear '+`${order.name}`+',\n' +
                'The transaction for your order '+`${newOrder._id}`+' has been proceed for the shipment on ' +`${newOrder.createdAt}`+  '\n' +
                '\n' +
                'Leave your feedback now.\n' +
                '\n' +
                'All feedback for this transaction on Shopping Platform should be left within 30 days of completing the order. \n' +
                '\n' +
                'Your feedback plays an important role in helping other buyers choose products and sellers.\n' +
                'Sincerely,\n\n' +
                'The Shoppingplatform.com team'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.status(201).json(newOrder);

    }catch (error){
        res.status(409).json({ message: error });
    }
}