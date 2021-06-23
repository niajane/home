const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    "description": String,
    "list": String,
    "completed": Boolean,
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;