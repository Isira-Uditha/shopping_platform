import Item from "../models/item.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";

export const getPosts = async (req,res) => {
    try {
        const postMessages = await Item.find();
        res.status(200  ).json(postMessages);
    }catch (error){
        res.status(404).json({ message: error });
    }
}

export const createPost = (req,res) => {

    console.log("Inside posts in Controller");
    const post = req.body;
    const newPostMessage = new Item({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        newPostMessage.save();

        res.status(201).json(newPostMessage);
    }catch (error){
        res.status(409).json({ message: error });
    }
}

export const updatePost =  async (req,res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post With That id');

    const updatedPost = await Item.findByIdAndUpdate(_id, post,{new : true});

    res.json(updatedPost);

}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Item.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await Item.findById(id);

    const index = post.like.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
        post.like.push(req.userId);
    } else {
        post.like = post.like.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await Item.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}

export const createOrder = (req,res) => {


    console.log("Inside order in Controller");

    const order = req.body;
    console.log(order);
    const newOrder = new Order({ ...order, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        newOrder.save();

        res.status(201).json(newOrder);
    }catch (error){
        res.status(409).json({ message: error });
    }
}
