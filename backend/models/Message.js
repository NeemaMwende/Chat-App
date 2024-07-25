import mongoose from "mongoose";
import Conversations from "./Conversations";

const messageSchema = new mongoose.Schema({
   conversation : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversations'
   }
});

export default mongoose.model("Message", messageSchema);