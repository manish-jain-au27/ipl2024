const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const formRoutes = require('./routes/formRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');

const app = express();
const PORT = 3000;
const MONGODB_URI = 'mongodb+srv://manish:manish@cluster0.pdkmfzs.mongodb.net/ipl2024';

// Connect to MongoDB
mongoose.connect(MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/forms', formRoutes);
app.use('/api/admin', adminRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
