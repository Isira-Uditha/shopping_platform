import mongoose from "mongoose";

//Item model
const itemSchema = mongoose.Schema({
    item: String,
    description: String,
    price: String,
    creator: String,
    selectedFile: String,
    like: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Item = mongoose.model('Item', itemSchema);

export default Item;