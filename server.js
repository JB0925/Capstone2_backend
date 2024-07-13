require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require ('cors');
const connectDB = require('./db');
const authRoutes = require('./authRoutes');
const recipeRoutes = require('./recipeRoutes')
const favoritesRoutes = require('./favoritesRoutes');
const userRoutes = require('./userRoutes');
const dotenv = require('dotenv');

// load environment variables from .env file
dotenv.config();

// intialize Express application
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// define simple route to check if API is running
app.get('/', (req, res) => res.send('API is running'));

// use routes for requests
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/users', userRoutes);

// database connection
(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/recipes', require('./routes/recipeRoutes'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
