import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Conversation from './components/Conversation';
import CreateConversation from './components/CreateConversation';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import { useState } from 'react';


function App() {
const [token, useToken] = useState(localStorage.getItem("token") || '');

  return (
   <Router>
    <Routes>
      {
        !token?(
          <>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/*' element={<Navigate to='/login'/>}/>
          </>
        ):(
          <>
            {/* <Route path='/chat' element={<Chat />}/>
            <Route path='/conversation' element={<Conversation />}/> */}
            <Route path='/createconversion' element={<CreateConversation />}/>
          </>
        )
      }
    </Routes>
   </Router>
  )
}

export default App
