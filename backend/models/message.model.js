import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        trim: true
    }
}, {timestamps: true});   // createdAt, updatedAt

const Message = mongoose.model("Message", messageSchema); // "Message" is the name of the collection in MongoDB 
export default Message;