const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todo.routes');

const app = express();

// Allow requests from the Angular dev server
app.use(cors({ origin: 'http://localhost:4200' }));

// Parse incoming JSON bodies
app.use(express.json());

// Mount todo routes
app.use('/api/todos', todoRoutes);

// Health check
app.get('/', (req, res) => res.json({ status: 'OK', message: 'To-Do API is running' }));

module.exports = app;
