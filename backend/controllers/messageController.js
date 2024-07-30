import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
    const { conversation, sender, text } = req.body;
    try {
        const newMessage = new Message({ conversation, sender, text });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMessagesByConversation = async (req, res) => {
    const { conversationId } = req.params;
    try {
        const messages = await Message.find({ conversation: conversationId }).populate('sender', 'username');
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
