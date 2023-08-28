import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';
import BookCard from './BookCard';
import { useAuth } from '../contexts/AuthContext';

const MyBooks = () => {
  const { user } = useAuth();
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    async function fetchMyBooks() {
      try {
        const response = await axios.get('https://bookstore-6oe2.onrender.com/api/books/my-books', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setMyBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (user) {
      fetchMyBooks();
    }
  }, [user]);

  return (
    <Box maxWidth="800px" mx="auto" p={3}>
      <Typography variant="h4" gutterBottom>My Books</Typography>
      {myBooks.length === 0 ? (
        <Typography variant="subtitle1">Books you upload will appear here</Typography>
      ) : (
        <Grid container spacing={2}>
          {myBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book._id}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyBooks;
