// src/components/Chat.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:4000');

const Chat = ({ token, conversationId, currentUserId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (!conversationId) return;

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/messages/${conversationId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessages(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching messages', error);
            }
        };

        fetchMessages();

        socket.emit('join conversation', conversationId);

        socket.on('chat message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
            console.log("socket==>", message);
        });

        return () => {
            socket.emit('leave conversation', conversationId);
            socket.off('chat message');
        };
    }, [conversationId, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            // Send message to backend API
            const response = await axios.post('http://localhost:4000/api/messages', 
                { conversation: conversationId, sender: currentUserId, text: newMessage },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Emit message to other connected clients
            socket.emit('chat message', response.data);

            setNewMessage('');
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    const styles = {
        chatContainer: {
            display: 'flex',
            flexDirection: 'column',
            margin: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '10px',
        },
        messageList: {
            listStyleType: 'none',
            padding: '0',
            maxHeight: '300px',
            overflowY: 'scroll',
        },
        messageItem: {
            padding: '10px',
            margin: '5px 0',
            borderRadius: '5px',
            maxWidth: '70%',
            wordWrap: 'break-word',
        },
        ownMessage: {
            backgroundColor: '#f0f8ff',
            alignSelf: 'flex-end',
            textAlign: 'right',
        },
        otherMessage: {
            backgroundColor: '#e0e0e0',
            alignSelf: 'flex-start',
        },
        inputContainer: {
            display: 'flex',
            marginTop: '10px',
        },
        inputField: {
            flex: '1',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px 0 0 5px',
        },
        submitButton: {
            padding: '10px 20px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
            borderRadius: '0 5px 5px 0',
        }
    };

    return (
        <div style={styles.chatContainer}>
            <h2>Chat</h2>
            <ul style={styles.messageList}>
                {messages.map((msg) => (
                    <li
                        key={msg._id}
                        style={{
                            ...styles.messageItem,
                            ...(msg.sender === currentUserId ? styles.ownMessage : styles.otherMessage),
                        }}
                    >
                        {msg.text}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} style={styles.inputContainer}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    required
                    style={styles.inputField}
                />
                <button type="submit" style={styles.submitButton}>Send</button>
            </form>
        </div>
    );
};

export default Chat;
