import Order from "../models/Order.js";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();
import { createRequire } from 'module';

//Create a new order record and insert into the database by sending otp and email to the user
export const createOrder = (req,res) => {
    const order = req.body;
    const require = createRequire(import.meta.url);

    //twilio implementation (Twilio used to send otp)
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    //Generating unique id for the otp code
    const generateUniqueId = require('generate-unique-id');
    const id = generateUniqueId({
        length: 5,
        useLetters: false,
        useNumbers: true
    });

    try {
        if(order.mobileNumber != ''){
            const newOrder = new Order({ ...order, creator: req.userId, createdAt: new Date().toISOString() });
            newOrder.save();

            const message = 'The seller has left feedback for your order no.' + `${newOrder._id}` +'.\n' +
                ' \n' +
                'Dear '+`${order.name}`+',\n\n' +
                'The transaction for your order '+`${newOrder._id}`+' has been proceed for the shipment on ' +`${newOrder.createdAt}`+  '\n' +
                '\n' +
                'Your OTP Number '+ `${id}` +'.\n\n' +
                'Sincerely,\n\n' +
                'The Shoppingplatform.com team'

            client.messages
                .create({
                    body: `${message}`,
                    from: '+16202343625',
                    to: '+94715301808'
                })
                .then(message => console.log(message.sid))
                .catch( err => console.log(err));

            res.status(201).json(newOrder);
        }
        else if(order.cardNumber != ''){
            console.log("xxxxx"+order.cardNumber);
            const newOrder = new Order({ ...order, creator: req.userId, createdAt: new Date().toISOString() });
            newOrder.save();

            //Message to be sent with the email
            const message = 'The seller has left feedback for your order no.' + `${newOrder._id}` +'.\n' +
                ' \n' +
                'Dear '+`${order.name}`+',\n\n' +
                'The transaction for your order '+`${newOrder._id}`+' has been proceed for the shipment on ' +`${newOrder.createdAt}`+  '\n' +
                '\n' +
                'Leave your feedback now.\n' +
                '\n' +
                'All feedback for this transaction on Shopping Platform should be left within 30 days of completing the order. \n' +
                '\n' +
                'Your feedback plays an important role in helping other buyers choose products and sellers.\n' +
                'Sincerely,\n\n' +
                'The Shoppingplatform.com team'

            //Email configuration
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
                to: `${order.email}`,
                subject: 'Sending Email using Node.js',
                text: `${message}`
            };

            //Firing the email
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            res.status(201).json(newOrder); //Sending 201 http status code
        }else{
            console.log("Your Cart is Empty, Please select some items");
        }
    }catch (error){
        res.status(409).json({ message: error });
    }
}