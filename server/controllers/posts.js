import Item from "../models/item.js";
import mongoose from "mongoose";

//Fetching item posts from the database
export const getPosts = async (req,res) => {
    try {
        const postMessages = await Item.find();
        res.status(200  ).json(postMessages); //Sending OK http status code
    }catch (error){
        res.status(404).json({ message: error }); //Sending not found http status code
    }
}

//Create a new item record and insert into the database
export const createPost = (req,res) => {
    const post = req.body;
    //creating a new instance from item model and assigning item data
    const newPostMessage = new Item({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    try {
        newPostMessage.save(); //Saving to the database

        res.status(201).json(newPostMessage); //Sending created http status code
    }catch (error){
        res.status(409).json({ message: error }); //Conflict response status code
    }
}

//Update item post
export const updatePost =  async (req,res) => {
    const { id: _id } = req.params; //fetching the id of the post item
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post With That id'); //Validating the post id

    const updatedPost = await Item.findByIdAndUpdate(_id, post,{new : true}); //Find and Update operation

    res.json(updatedPost);

}

//Deleting a particular post item
export const deletePost = async (req, res) => {
    const { id } = req.params; //fetching the id of the post item

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`); //Validating the post id

    await Item.findByIdAndRemove(id); //Find and Remove operation

    res.json({ message: "Post deleted successfully." });
}

//Increment the like count of a post
export const likePost = async (req, res) => {
    const { id } = req.params; //fetching the id of the post item

    //Check the user authorization
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`); //Validating the post id that the user wants to like
    const post = await Item.findById(id); //Finding the item related to the post id

    const index = post.like.findIndex((id) => id ===String(req.userId)); //checking whether the current user id is already include in the current liked users

    if (index === -1) {
        post.like.push(req.userId); //Increment the like count of the particular post and add the user id to the liked users
    } else {
        post.like = post.like.filter((id) => id !== String(req.userId)); //Dislike function (deleting user id from the liked user ids) decrement like count
    }

    const updatedPost = await Item.findByIdAndUpdate(id, post, { new: true }); //updating the like count of the post

    res.json(updatedPost);
}
