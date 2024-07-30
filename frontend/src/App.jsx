import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Conversations from './components/Conversations';
import CreateConversation from './components/CreateConversation';
import Chat from './components/Chat';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [conversationId, setConversationId] = useState('');
    const currentUserId = localStorage.getItem('userId');

    return (
        <Router>
            <Routes>
                {!token ? (
                    <>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login setToken={setToken} />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                ) : (
                    <>
                        <Route
                            path="/create-conversation"
                            element={
                                <>
                                    <CreateConversation token={token} setConversationId={setConversationId} />
                                    <Conversations token={token} setConversationId={setConversationId} currentUserId={currentUserId} />
                                    {conversationId && (
                                        <Chat token={token} conversationId={conversationId} currentUserId={currentUserId} />

                                    )}
                                </>
                            }
                        />
                        {/* <Route
                            path="/conversations"
                            element={<Conversations token={token} setConversationId={setConversationId} currentUserId={currentUserId} />}
                        />
                        {conversationId && (
                            <Route
                                path="/chat"
                                element={<Chat token={token} conversationId={conversationId} currentUserId={currentUserId} />}
                            />
                        )} */}
                        <Route path="*" element={<Navigate to="/create-conversation" />} />
                    </>
                )}
            </Routes>
        </Router>
    );
};

export default App;
