import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';
import BookCard from './BookCard';
import { useAuth } from '../contexts/AuthContext';

const Favorites = () => {
  // Access user data from AuthContext
  const { user } = useAuth();
  
  // State to hold user's favorite books
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    // Fetch user's favorite books from the server
    async function fetchFavoriteBooks() {
      try {
        const response = await axios.get(`https://bookstore-79jw.onrender.com/api/books/my-favorites`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        // Update state with fetched favorite books
        setFavoriteBooks(response.data.favorites);
      } catch (error) {
        console.error(error);
      }
    }
    // Fetch favorite books if user is authenticated
    if (user) {
      fetchFavoriteBooks();
    }
  }, [user]);

  return (
    <Box maxWidth="800px" mx="auto" p={3}>
      {/* Display heading */}
      <Typography variant="h4" gutterBottom>Favorites</Typography>
      <Grid container spacing={2}>
        {/* Map through favorite books and display as BookCard components */}
        {favoriteBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            {/* Pass book data and "fav" prop to BookCard component */}
            <BookCard book={book} fav={true}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Favorites;
