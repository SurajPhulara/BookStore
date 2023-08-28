import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  summary: String,
  image: String,
  genre: String,
  price: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
