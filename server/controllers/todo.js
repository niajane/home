const Todo = require('../models/todo.model.js');

const createTodo = async(req, res) => {
    try { 
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json(todo);
    } catch(error) {
        res.status(400).json({success: false, error});
    }
}

const getTodos = async(req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(400).json({success: false, error});
    }
}

const updateTodo = async(req, res) => {
    const allowedOptions = ['description', 'list', 'completed'];
    const selectedOption = Object.keys(req.body);
    const exists = selectedOption.every(option => allowedOptions.includes(option));
    if(!exists) {
        return res.status(404).json({ success: false, error});
    }
    try{
        const todo = await Todo.findById({_id: req.params.id });
        selectedOption.forEach(option => todo[option] = req.body[option]);
        await todo.save()
        res.status(200).json(todo);
    } catch (error) {
        res.status(404).json({ success: false, error});
    }
}

const deleteTodo = async(req, res) => {
    try { 
        const todo = await Todo.findOneAndDelete({_id: req.params.id });
        res.status(200).json("Todo was deleted");
    } catch (error) {
        res.status(404).json({ success: false, error });
    }
}

module.exports = { createTodo, getTodos, updateTodo, deleteTodo }