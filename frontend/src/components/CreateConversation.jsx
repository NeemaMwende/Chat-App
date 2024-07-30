import React, { useState } from 'react';
import axios from 'axios';

const CreateConversation = ({ token, setConversationId }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/conversations', { participants: [username] }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setConversationId(response.data._id);
        } catch (error) {
            console.error('Error creating conversation:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Create Conversation</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Create</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginBottom: '10px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default CreateConversation;
