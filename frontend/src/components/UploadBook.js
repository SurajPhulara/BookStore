import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function BookUpload() {
  const navigate = useNavigate(); // Navigation function from react-router-dom
  const [title, setTitle] = useState(''); // State to hold book title
  const [author, setAuthor] = useState(''); // State to hold book author
  const [summary, setSummary] = useState(''); // State to hold book summary
  const [image, setImage] = useState(''); // State to hold book image URL
  const [genre, setGenre] = useState(''); // State to hold book genre
  const [price, setPrice] = useState(''); // State to hold book price
  const { user } = useAuth(); // Access user data from AuthContext
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send a POST request to the server to upload a new book
      const response = await axios.post('https://bookstore-6oe2.onrender.com/api/books/books', {
        title,
        author,
        summary,
        image,
        genre,
        price: parseFloat(price), // Convert price to a floating-point number
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Include user token in headers
        },
      });
      
      if (response.status === 200) {
        // Clear form fields after successful upload
        setTitle('');
        setAuthor('');
        setSummary('');
        setImage('');
        setGenre('');
        setPrice('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Display heading */}
      <Typography variant="h4">Upload Book</Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input fields for book details */}
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Author"
          variant="outlined"
          fullWidth
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          label="Summary"
          variant="outlined"
          multiline
          fullWidth
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <TextField
          label="Genre"
          variant="outlined"
          fullWidth
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {/* Submit button */}
        <Button type="submit" variant="contained" color="primary">
          Upload
        </Button>
      </form>
    </div>
  );
}

export default BookUpload;
