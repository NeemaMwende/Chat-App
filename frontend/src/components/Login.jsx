import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:4000/api/auth/login", { username, password });
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('userId',response.data.userId);

    } catch (error) {
      alert(error.message);
    }
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   try {
  //     const response = await fetch("http://localhost:4000/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || 'An error occurred');
  //     }
      
  //     navigate('/login');
  //   } catch (error) {
  //     console.error('Error during registration:', error); // Logs the complete error object
  //     alert(error.message); // Display the error message
  //   }
  // };
  

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
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
          placeholder='Please enter your password'
        />
        <div style={styles.btns}>
        <button type='submit' style={styles.button}>Login</button>
            <Link to='/register'>
              <button type='button' style={styles.button}>
                Register
              </button>
            </Link>
        </div>
        
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
  btns: {
    display: "flex",
    // justifyContent: "space-between",
    marginTop: "20px", // Reduced margin
    width: "100%",
    // marginRight: "40px",
    // gap:"10px"
  },
  // button: {
  //   padding: "10px 20px",
  //   border: "none",
  //   borderRadius: "5px",
  //   backgroundColor: "#007BFF",
  //   color: "#fff",
  //   cursor: "pointer"
  // },
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
