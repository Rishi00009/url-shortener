const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Add CORS to handle cross-origin requests

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());  // to parse incoming JSON data
app.use(cors());          // Allow cross-origin requests

// Import routes
const userRoutes = require('./routes/userRoutes');
const urlRoutes = require('./routes/urlRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.get('/api/url/all', (req, res) => {
  console.log("Fetching all URLs");
  URL.find().then(urls => res.json(urls)).catch(err => res.status(500).json(err));
});
app.use('/api/urls', urlRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
