import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5173/api/auth/register", {username,password });
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input 
          type='text'
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          placeholder='Enter your username'
        />
        <label>Password:</label>
        <input 
          type='password'
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          placeholder='Enter your password'
        />
        <button type='submit' style={styles.button}>Register</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px" // Reduced margin
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px" // Added gap for spacing between elements
  },
  input: {
    marginBottom: "10px",
    padding: "10px", // Reduced padding
    border: "1px solid #ccc",
    borderRadius: "5px", // Reduced border-radius for a more standard look
    fontSize: "16px",
    width: "90%", // Adjusted width to 100%
    marginLeft: "10px"
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff", // Corrected color code
    border: 'none',
    borderRadius: "5px", // Reduced border-radius for consistency
    padding: "10px",
    cursor: "pointer", // Fixed typo: Cursor -> cursor
    fontSize: "16px",
    width: "30%", // Adjusted width to 100% for full width
    marginLeft: "9rem" // Removed left margin for better centering
  }
}

export default Register;
