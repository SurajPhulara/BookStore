import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';
import cors from "cors";

const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.46aoj1w.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
