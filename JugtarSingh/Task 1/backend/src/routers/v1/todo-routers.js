const express = require('express');
const router = express.Router();
const {TodoController} = require('../../controllers');

router.post('/',
    TodoController.createTodo
)

// GET /api/v1/todos - retrieve all todos
router.get('/',
    TodoController.getTodos
)

router.get('/:id',
    TodoController.getTodo
)

// Support both PUT and PATCH for updates so clients can use either method
router.put('/:id',
    TodoController.updateTodo
)

router.patch('/:id',
    TodoController.updateTodo
)

router.delete('/:id',
    TodoController.deleteTodo
)

module.exports = router;