// src/components/Conversations.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Conversations = ({ token, setConversationId }) => {
    const [conversations, setConversations] = useState([]);

    

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/conversations', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setConversations(response.data);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };

        fetchConversations();
    }, [token]);

    return (
        <div>
            {conversations.map(conversation => (
                <div key={conversation._id} onClick={() => setConversationId(conversation._id)}>
                    {conversation.title}
                </div>
            ))}
        </div>
    );
};

export default Conversations;
