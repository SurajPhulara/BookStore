import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isMobile = windowWidth < 550;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bookstore
          </Typography>
          {!isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </>
          )}
          {isMobile && isAuthenticated && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          {isAuthenticated && !isMobile && (
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
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpen && isMobile}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <List sx={{ width: 250 }} onClick={handleDrawerToggle}>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          {!isAuthenticated && (
            <>
              <ListItem button component={Link} to="/signup">
                <ListItemText primary="Signup" />
              </ListItem>
              <ListItem button component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItem>
            </>
          )}
          {isAuthenticated && (
            <>
              <ListItem button component={Link} to="/my-books">
                <ListItemText primary="My Books" />
              </ListItem>
              <ListItem button component={Link} to="/favorites">
                <ListItemText primary="Favorites" />
              </ListItem>
              <ListItem button component={Link} to="/upload-book">
                <ListItemText primary="Upload Book" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
