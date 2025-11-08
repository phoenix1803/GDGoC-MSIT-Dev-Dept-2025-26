const { StatusCodes } = require('http-status-codes');
const {TodoRepository} = require('../repositories');

const AppError = require('../utils/error/app-error');
const todoRepository = new TodoRepository();

async function createTodo(data){
    try {
        const todo = await todoRepository.create(data);
        return todo;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot create a new todo',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllTodos(){
    try {
        // CrudRepository defines getAll(), so call that
        const todos = await todoRepository.getAll();
        return todos;
    } catch (error) {
        throw new AppError('Cannot retrieve todos', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getTodo(id){
    try {
        const todo = await todoRepository.get(id);
        return todo;
    } catch (error) {
        throw new AppError('Cannot fetch the todo',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteTodo(id){
    try {
        const response = await todoRepository.destroy(id);
        return response;
    } catch (error) {
        throw new AppError('Cannot delete the todo',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateTodo(id,data){
    try {
        // perform the update, then return the updated record
        await todoRepository.update(id, data);
        const updatedTodo = await todoRepository.get(id);
        return updatedTodo;
    } catch (error) {
        throw new AppError('Cannot update the todo',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createTodo,
    getAllTodos,
    getTodo,
    deleteTodo,
    updateTodo
}