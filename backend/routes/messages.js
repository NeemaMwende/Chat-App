import express from "express";
import { sendMessage, getMessageByConversation } from "../controllers/messageController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post('/', authMiddleware, sendMessage);
router.get('/:conversationId/messages', authMiddleware,getMessageByConversation);


export default router;