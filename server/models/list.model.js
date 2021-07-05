const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    "description": String,
    "completed": Boolean,
});

const listSchema = new mongoose.Schema({
    "title": String,
    "colour": String,
    "items" : [todoSchema],
})

const List = mongoose.model('List', listSchema);
const Todo = mongoose.model('Todos', todoSchema);

module.exports = {List, Todo};