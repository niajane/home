const express = require('express');
const router = express.Router();
const { getListsOverview, createList, getList, getLists, updateList, deleteList, deleteCompleted, deleteTodo, updateTodo, createTodo } = require('../controllers/list.js')

router.get('/', getLists);
router.get('/overview', getListsOverview);
router.get('/:id', getList);
router.post('/', createList);
router.patch('/:id', updateList);
router.delete('/:id', deleteList);
router.delete('/completed/:id', deleteCompleted);
router.delete('/:list_id/:todo_id', deleteTodo);
router.patch('/:list_id/:todo_id', updateTodo);
router.post('/:id', createTodo);

module.exports = router;