import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';
import BookCard from './BookCard';
import { useAuth } from '../contexts/AuthContext';

const MyBooks = () => {
  // Access user data from AuthContext
  const { user } = useAuth();
  
  // State to hold user's owned books
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    // Fetch user's owned books from the server
    async function fetchMyBooks() {
      try {
        const response = await axios.get('https://bookstore-6oe2.onrender.com/api/books/my-books', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        // Update state with fetched owned books
        setMyBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    // Fetch owned books if user is authenticated
    if (user) {
      fetchMyBooks();
    }
  }, [user]);

  return (
    <Box maxWidth="800px" mx="auto" p={3}>
      {/* Display heading */}
      <Typography variant="h4" gutterBottom>My Books</Typography>
      {/* Grid layout for displaying owned books */}
      <Grid container spacing={2}>
        {/* Map through owned books and display as BookCard components */}
        {myBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            {/* Display each owned book using BookCard component */}
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyBooks;
