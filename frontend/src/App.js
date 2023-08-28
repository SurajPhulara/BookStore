import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import MyBooks from './components/MyBooks';
import Favorites from './components/Favorites';
import UploadBook from './components/UploadBook';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-books" element={<MyBooks />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/upload-book" element={<UploadBook />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
