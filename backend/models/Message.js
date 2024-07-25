import mongoose from "mongoose";
import Conversations from "./Conversations";

const messageSchema = new mongoose.Schema({
   conversation : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
   },
   sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
   },
   text: {
        type: String,
        required: true
   },
   createdAt: {
        type: Date,
        default: Date.now()
   }

});

export default mongoose.model("Message", messageSchema);