import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate(); // Navigation function from react-router-dom
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send a POST request to the server to perform user registration
      await axios.post('https://bookstore-6oe2.onrender.com/api/auth/signup', { username, password });
      // Navigate to the login page after successful signup
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box maxWidth="400px" mx="auto" mt={4} p={3} border="1px solid #ccc" borderRadius={4}>
      {/* Display signup form */}
      <Typography variant="h4" align="center" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSignup}>
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
        {/* Signup button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Signup
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
