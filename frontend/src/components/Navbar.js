import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const navigate = useNavigate(); // Navigation function from react-router-dom
  const { isAuthenticated, logout } = useAuth(); // Access isAuthenticated and logout functions from AuthContext
  console.log('isAuthenticated:', isAuthenticated);

  // Handle user logout
  const handleLogout = async () => {
    await logout(); // Call the logout function from AuthContext
    navigate('/login'); // Navigate to the login page after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Display title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Bookstore
        </Typography>
        {/* Display navigation links based on authentication status */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {!isAuthenticated ? (
          // Display signup and login links if user is not authenticated
          <>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        ) : (
          // Display user-specific links if user is authenticated
          <>
            <Button color="inherit" component={Link} to="/my-books">
              My Books
            </Button>
            <Button color="inherit" component={Link} to="/favorites">
              Favorites
            </Button>
            <Button color="inherit" component={Link} to="/upload-book">
              Upload Book
            </Button>
            {/* Button to log out */}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
