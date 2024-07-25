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

        const participantIds = users.map(user=>user._id)
        
        const conversation = new Conversation(participantIds);
        await conversation.save();
        res.status(200).json({conversation});


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getConversationByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const conversations = await Conversation.find({participants:userId});

        res.status(200).json(conversations);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}