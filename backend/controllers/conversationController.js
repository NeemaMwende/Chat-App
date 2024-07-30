// controllers/conversationController.js
import Conversation from '../models/Conversation.js';
import User from '../models/User.js';
import Message from '../models/Message.js';
import mongoose from 'mongoose';

export const createConversation = async (req, res) => {
    try {
        const { participants } = req.body;

        // Find users by username
        const users = await User.find({ username: { $in: participants } });

        if (users.length !== participants.length) {
            return res.status(404).json({ message: 'One or more users not found' });
        }

        // Extract user IDs
        const participantIds = users.map(user => user._id);

        const conversation = new Conversation({ participants: participantIds });
        await conversation.save();
        res.status(201).json(conversation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getConversationsByUser = async (req, res) => {
    try {
        const userId = req.user._id; // assuming you have user authentication middleware
        const conversations = await Conversation.find({ participants: userId });
        res.status(200).json(conversations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getMessagesByConversation = async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.conversationId });
        console.log("messages",messages)
        res.json(messages);
    } catch (error) {
        res.status(500).send('Server error');
    }
};