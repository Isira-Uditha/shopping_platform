import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200  ).json(postMessages);
    }catch (error){
        res.status(404).json({ message: error });
    }
}

export const createPost = (req,res) => {

    const post = req.body;
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

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

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post,{new : true});

    res.json(updatedPost);

}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.like.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
        post.like.push(req.userId);
    } else {
        post.like = post.like.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}

