const express = require('express');
const router = express.Router();
const Todo = require('../models/todo.model');

// GET /api/todos — return all todos, newest first
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
    console.log('Fetched todos:', todos.length);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch todos', error: err.message });
    console.error('Error fetching todos:', err.message);
  }
});

// POST /api/todos — create a new todo
router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }
  try {
    const todo = new Todo({ title: title.trim() });
    const saved = await todo.save();
    res.status(201).json(saved);
    console.log('Created todo:', saved.title);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create todo', error: err.message });
    console.error('Error creating todo:', err.message);
  }
});

module.exports = router;
