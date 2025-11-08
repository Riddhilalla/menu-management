const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const config = require('./config');

// create the Express app
const app = express();

// middleware
app.use(cors()); // enable CORS for API testing (e.g., Postman / browser)
app.use(express.json()); // parse incoming JSON bodies
app.use(morgan('dev')); // request logging in dev

// basic health route — quick sanity check for the server
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// mount routes
// - categories are mounted under /api/categories
// - subcategory and item route files register paths under /api
const categoryRoutes = require('./routes/category.routes');
const subcategoryRoutes = require('./routes/subcategory.routes');
const itemRoutes = require('./routes/item.routes');

app.use('/api/categories', categoryRoutes);
app.use('/api', subcategoryRoutes);
app.use('/api', itemRoutes);

// placeholder for other /api routes - returns 404 for unknown API endpoints
app.use('/api', (req, res, next) => res.status(404).json({ message: 'API route not found' }));

// global error handler - logs and responds with a simple JSON error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// connect to mongo if MONGO_URI present
// connect to MongoDB only if a URI is provided via environment
if (config.mongoUri) {
  mongoose.connect(config.mongoUri, { autoIndex: true }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
}

module.exports = app;
