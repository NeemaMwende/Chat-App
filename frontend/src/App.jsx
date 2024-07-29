import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Conversation from './components/Conversation';
import CreateConversation from './components/CreateConversation';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || '');

  return (
    <Router>
      <Routes>
        {token ? (
          <>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/chat' element={<Chat />} />
            <Route path='/conversation' element={<Conversation />} /> */}
            <Route path='/*' element={<Navigate to='/login' />} />
          </>
        ) : (
           <>
             <Route path='/conversation' element={<Conversation />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/create-conversation' element={<CreateConversation />} />
            <Route path='/*' element={<Navigate to='/login' />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
