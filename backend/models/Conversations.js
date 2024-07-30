// models/Conversation.js
import mongoose from 'mongoose';

// Define the schema for a conversation
const conversationSchema = new mongoose.Schema({
    participants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }],
}, {
    timestamps: true // This option will add `createdAt` and `updatedAt` fields
});

// Export the Conversation model
export default mongoose.model('Conversation', conversationSchema);

