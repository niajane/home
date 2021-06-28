const express = require('express');
const router = express.Router();
const { getTodos, createTodo, updateTodo, deleteTodo, deleteCompleted, getList, getListNames, deleteList } = require('../controllers/todo.js')

router.get('/', getTodos);
router.post('/', createTodo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.delete('/completed/:list', deleteCompleted)
router.delete('/list/:list', deleteList)
router.get('/list/:list', getList);
router.get('/listNames/', getListNames);

module.exports = router;