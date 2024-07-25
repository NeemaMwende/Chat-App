import express from "express";
import { createConversation, getConversationByUser, getMessageByConversation } from "../controllers/conversationController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post('/', authMiddleware, createConversation);
router.get('/', authMiddleware,getConversationByUser);
router.get('/:conversationId/messages', authMiddleware,getMessageByConversation);


export default router;