// routes/conversations.js
import express from 'express';
import { createConversation, getConversationsByUser,getMessagesByConversation } from '../controllers/conversationController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createConversation);
router.get('/', authMiddleware, getConversationsByUser);
router.get('/:conversationId/messages', authMiddleware, getMessagesByConversation);

export default router;
