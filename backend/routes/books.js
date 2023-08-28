import express from 'express';
import Book from '../models/Book.js';
import authMiddleware from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/books', authMiddleware, async (req, res) => {
  try {
    const { title, author, summary, image, genre, price } = req.body;
    const userId = req.userId;
    const book = new Book({ title, author, summary, image, genre, price, userId });
    await book.save();
    res.json({ message: 'Book uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Book upload failed' });
  }
});

router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});

router.get('/my-books', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const books = await Book.find({ userId });
    
    // console.log("here is your user id =  ", userId,  "  and data     ", books)
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user\'s books' });
  }
});


// Add a book to user's favorites
router.post('/favorite', authMiddleware, async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.userId;

    // Find the user and update the favorites array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the bookId is already in the favorites array
    const bookIndex = user.favorites.indexOf(bookId);
    if (bookIndex !== -1) {
      // Book is already in favorites, so remove it
      user.favorites.splice(bookIndex, 1);
      await user.save();
      return res.json({ message: 'Book removed from favorites' });
    }

    // Book is not in favorites, so add it
    user.favorites.push(bookId);
    await user.save();

    res.json({ message: 'Book added to favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update favorites' });
  }
});

router.get('/my-favorites', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    
    // Find the user and populate the favorites array with book IDs
    const user = await User.findById(userId).populate('favorites');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});
router.get('/filtered-books', async (req, res) => {
  try {
    const { searchTerm, filterGenre, filterPriceMin, filterPriceMax } = req.query;
    const filters = {};

    if (searchTerm) {
      filters.title = { $regex: searchTerm, $options: 'i' };
    }
    if (filterGenre) {
      filters.genre = filterGenre;
    }
    if (filterPriceMin && filterPriceMax) {
      filters.price = { $gte: parseFloat(filterPriceMin), $lte: parseFloat(filterPriceMax) };
    } else if (filterPriceMin) {
      filters.price = { $gte: parseFloat(filterPriceMin) };
    } else if (filterPriceMax) {
      filters.price = { $lte: parseFloat(filterPriceMax) };
    }

    const filteredBooks = await Book.find(filters);
    res.json(filteredBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch filtered books' });
  }
});
export default router;
