const express = require('express')
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();

const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from public
app.use(express.static(path.join(__dirname, 'views')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
