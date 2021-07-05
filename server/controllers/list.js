const { List, Todo } = require('../models/list.model.js');

const createList = async(req, res) => {
    try { 
        const list = new List(req.body);
        await list.save();
        res.status(201).json(list);
    } catch(error) {
        res.status(400).json({success: false, error});
    }
}

const getLists = async(req, res) => {
    try {
        const list = await List.find();
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({success: false, error});
    }
}

const getList = async(req, res) => {
    try {
            const list = await List.find({ _id: req.params.id });
            res.status(200).json(list);
    } catch (error) {
            res.status(400).json({success: false, error});
    }
}

const updateList = async(req, res) => {
    const allowedOptions = ['title', 'colour'];
    const selectedOption = Object.keys(req.body);
    const exists = selectedOption.every(option => allowedOptions.includes(option));
    if(!exists) {
        return res.status(404).json({ success: false, error: "option doesn't exist, update failed"});
    }
    try{
        const list = await List.findById({_id: req.params.id });
        selectedOption.forEach(option => list[option] = req.body[option]);
        await list.save();
        res.status(200).json(list);
    } catch (error) {
        res.status(404).json({ success: false, error});
    }
}

const deleteList = async(req, res) => {
    try { 
        const list = await List.findOneAndDelete({_id: req.params.id });
        res.status(200).json("List was deleted");
    } catch (error) {
        res.status(404).json({ success: false, error });
    }
}

//TODOS
const deleteCompleted = async(req, res) => {
    try {
        const newList = await List.findOne({_id: req.params.id });
        newList.items = newList.items.filter((item) => item.completed == false);
        newList.save();
        res.status(200).json(newList);
    } catch (error) {
        res.status(404).json({ success: false, error });
    }
}

//TODOS
const deleteTodo = async(req, res) => {
    try { 
        const list = await List.findById({_id: req.params.list_id });
        list.items.id(req.params.todo_id).remove();
        await list.save();
        res.status(200).json("Todo was deleted");
    } catch (error) {
        res.status(404).json({ success: false, error });
    }
}

//TODOS
//update todo
const updateTodo = async(req,res) => {
    const allowedOptions = ['description', 'completed'];
    const selectedOption = Object.keys(req.body);
    const exists = selectedOption.every(option => allowedOptions.includes(option));
    if(!exists) {
        return res.status(404).json({ success: false, error: "option doesn't exist, update failed"});
    }
    try{
        const list = await List.findById({_id: req.params.list_id});
        const todo = await list.items.id(req.params.todo_id);
        selectedOption.forEach(option => todo[option] = req.body[option]);
        await list.save();
        res.status(200).json(todo);
    } catch (error) {
        res.status(404).json({ success: false, error});
    }
}

//TODOS
//create Todo
const createTodo = async(req,res) => {
    try {
        const todo = new Todo(req.body);
        const list = await List.findById(req.params.id);
        list.items.push(todo);
        await list.save();
        res.status(201).json(todo);
    }
    catch(error) {
        res.status(400).json({success: false, error});
    }
}

module.exports = { createList, getList, getLists, updateList, deleteList, deleteCompleted, deleteTodo, updateTodo, createTodo }