import Conversation from "../models/Conversations";
import User from "../models/User.js";
import Message from "../models/Message.js";

export const createConversation = async (req, res) => {
    try {
        
        const {participants} = req.body;
        const user = await User.findOne({username:{$in:participants}})

        //participants=['angel','lexin','victor']
        //users=['angel','lexin','victor']
        if (users.length!== participants.length) {
            return res.status(404).json({message: "One or more users not found"});
        }


        const newConversation = new Conversation(req.body);
        await newConversation.save();
        res.status(200).json({newConversation});


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}