import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = 'test';

//Sign in validation 
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email }); //Checking the user is already available

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" }); //Validating the login user

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password); //Comparing the password

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" }); //Invalid message

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" }); //Assigning a token to the user and create 1hour session

        res.status(200).json({ result: oldUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" }); //Login failure message
    }
};

//Sign up validation 
export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName , address } = req.body; //Getting the user details from the login form

    try {
        const oldUser = await UserModal.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exists" }); //Checking the user is already in the database

        if(password !== confirmPassword) return res.status(400).json({ message: "Password don't match." }); //Matching the password fields of the login form

        const hashedPassword = await bcrypt.hash(password, 12); //Encrpting the password using bcrpt library

        const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` , address}); //Creating an object to the new user and save it in the database

        const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } ); //Assigning a token to the user and create 1hour 

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" }); //Sign up failure message
        console.log(error);
    }
};