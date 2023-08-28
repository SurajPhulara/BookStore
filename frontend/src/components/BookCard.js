import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book, fav }) => {
  // Access user data from AuthContext
  const { user } = useAuth();

  // State to manage favorite and bought status
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBought, setIsBought] = useState(false);

  // Navigation handler
  const navigate = useNavigate();

  // Check if the book is in user's favorites
  useEffect(() => {
    if (user) {
      setIsFavorite(user.favorites.includes(book._id));
    }
  }, [user, book._id]);

  // Handle toggling favorite status
  const handleFavoriteToggle = async () => {
    if (!user) {
      navigate('/login');
      return; // Redirect to login page if user is not logged in
    }

    try {
      // Update user's favorites list based on current status
      const updatedFavorites = isFavorite
        ? user.favorites.filter(id => id !== book._id)
        : [...user.favorites, book._id];

      setIsFavorite(!isFavorite);

      // Update user's favorites in context
      user.favorites = updatedFavorites;

      // Update favorite status on the server
      await axios.post(
        'https://bookstore-6oe2.onrender.com/api/books/favorite',
        { bookId: book._id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log('Favorite status updated');
    } catch (error) {
      console.error('Error updating favorite status:', error);
      setIsFavorite(!isFavorite); // Revert state change on error
    }
  };

  // Handle buying the book
  const handleBuyNow = async () => {
    try {
      if (!user) {
        navigate('/login');
        return; // Redirect to login page if user is not logged in
      }

      if (!isBought) {
        // Implement the logic for purchasing the book here
        console.log(`Buy Now clicked for book: ${book.title}`);
        setIsBought(true);
      }
    } catch (error) {
      console.error('Error buying book:', error);
    }
  };

  return (
    <Card>
      {/* Display book image */}
      <CardMedia
        component="img"
        height="auto" // Adjust to maintain aspect ratio
        width="100%" // Make the image responsive
        image={book.image}
        alt={book.title}
      />
      <CardContent>
        {/* Display book title */}
        <Typography variant="h6" gutterBottom>
          {book.title}
        </Typography>
        {/* Display book author */}
        <Typography variant="body2" color="textSecondary">
          {book.author}
        </Typography>
        {/* Display book summary */}
        <Typography variant="body2" color="textSecondary">
          {book.summary}
        </Typography>
        {/* Display book price */}
        <Typography variant="body2" color="textSecondary">
          Price: ${book.price}
        </Typography>
      </CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
        {/* Button to favorite/unfavorite the book */}
        <Button
          variant={isFavorite ? 'contained' : 'outlined'}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </Button>
        {/* Button to buy the book */}
        <Button
          variant={isBought ? 'outlined' : 'contained'}
          color="primary"
          onClick={handleBuyNow}
          disabled={isBought}
        >
          {isBought ? 'Bought' : 'Buy Now'}
        </Button>
      </Box>
    </Card>
  );
};

export default BookCard;
