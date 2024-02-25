import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    partipants: [{          
        type: mongoose.Schema.Types.ObjectId,       // We will save the id of the users in partipants array
        ref: "User"
    }],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: "Message", default: []}] // We will save the id of the messages in messages array
}, {timestamps: true});   // createdAt, updatedAt

const Conversation = mongoose.model("Conversation", conversationSchema); // "Conversation" is the name of the collection in MongoDB 
export default Conversation;