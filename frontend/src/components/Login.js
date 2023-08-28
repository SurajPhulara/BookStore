import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate(); // Navigation function from react-router-dom
  const { login } = useAuth(); // Access login function from AuthContext
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to manage error messages

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send a POST request to the server to perform login
      const response = await axios.post('https://bookstore-6oe2.onrender.com/api/auth/login', {
        username,
        password,
      });

      // Call the login function from AuthContext to set user data
      login(response.data);

      // Navigate to the home page after successful login
      navigate('/');
    } catch (error) {
      setError('Wrong ID or Password'); // Set the error message
      console.error(error);
    }
  };

  return (
    <Box maxWidth="400px" mx="auto" mt={4} p={3} border="1px solid #ccc" borderRadius={4}>
      {/* Display login form */}
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        {/* Username input field */}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="dense"
        />
        {/* Password input field */}
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="dense"
        />
        {/* Login button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        {/* Display error message if there's an error */}
        {error && (
          <Typography variant="body2" color="error" align="center" mt={2}>
            {error}
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default Login;
