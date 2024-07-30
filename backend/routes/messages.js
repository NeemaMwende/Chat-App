// routes/messages.js
import express from 'express';
import { sendMessage, getMessagesByConversation } from '../controllers/messageController.js';

const router = express.Router();

// Send message route
router.post('/', sendMessage);

// Get messages for a conversation route
router.get('/:conversationId', getMessagesByConversation);

export default router;
