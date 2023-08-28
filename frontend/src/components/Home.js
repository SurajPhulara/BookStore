import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, TextField, Button, Box } from '@mui/material';
import BookCard from './BookCard';

const Home = () => {
  // State to hold books data
  const [books, setBooks] = useState([]);

  // State for search and filter criteria
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [filterPriceMin, setFilterPriceMin] = useState('');
  const [filterPriceMax, setFilterPriceMax] = useState('');

  useEffect(() => {
    // Fetch all books on component mount
    async function fetchBooks() {
      try {
        const response = await axios.get('https://bookstore-6oe2.onrender.com/api/books/books');
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBooks();
  }, []);

  // Handle filtering books based on criteria
  const handleFilterClick = async () => {
    try {
      // Fetch filtered books based on criteria
      const response = await axios.get('https://bookstore-6oe2.onrender.com/api/books/filtered-books', {
        params: {
          searchTerm,
          filterGenre,
          filterPriceMin,
          filterPriceMax,
        },
      });
      setBooks(response.data); // Update displayed books with filtered data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box maxWidth="800px" mx="auto" p={3}>
      {/* Display heading */}
      <Typography variant="h4" gutterBottom>
        All Books
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
        {/* Search by title */}
        <TextField
          label="Search by Title"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          mb={2}
        />
        {/* Filter by genre */}
        <TextField
          label="Filter by Genre"
          variant="outlined"
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          fullWidth
          mb={2}
        />
        <Box display="flex" alignItems="center">
          {/* Min Price */}
          <TextField
            label="Min Price"
            variant="outlined"
            value={filterPriceMin}
            onChange={(e) => setFilterPriceMin(e.target.value)}
            type="number"
            fullWidth
            mb={2}
          />
          <Box mx={2}> {/* Gap between Min Price and Max Price */}
            {/* Max Price */}
            <TextField
              label="Max Price"
              variant="outlined"
              value={filterPriceMax}
              onChange={(e) => setFilterPriceMax(e.target.value)}
              type="number"
              fullWidth
            />
          </Box>
          {/* Filter button */}
          <Button variant="contained" color="primary" onClick={handleFilterClick}>
            Filter
          </Button>
        </Box>
      </Box>
      {/* Display books using BookCard component */}
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
