import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', { username, password });
            setToken(response.data.token);
            console.log("response==>",response);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username"
                    style={styles.input}
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                    style={styles.input}
                />
                <Link to="/register" style={styles.link}>Register</Link>
                <button type="submit" style={styles.button}>Login</button>
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
    link: {
        textAlign: 'center',
        marginBottom: '10px',
        display: 'block',
        color: '#007bff',
        textDecoration: 'none',
    }
};

export default Login;
