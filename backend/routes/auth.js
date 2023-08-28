import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    await user.save();

    res.json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup failed', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user._id }, '!@#$%');
    res.json({ token, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

export default router;