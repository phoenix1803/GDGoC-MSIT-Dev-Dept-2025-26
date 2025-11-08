const {TodoService} = require ('../service');
const { SuccessResponse , ErrorResponse } = require ('../utils/common');
const { StatusCodes } = require('http-status-codes');
async function createTodo (req,res){
    try {
        console.log("Request body", req.body);
    const todo = await TodoService.createTodo(req.body);
    // set data on the shared success response object
    SuccessResponse.data = todo;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

async function getTodos(req, res){
    try {
        const todos = await TodoService.getAllTodos();
        SuccessResponse.data = todos;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}
async function getTodo(req, res){
    try {
        const todo = await TodoService.getTodo(req.params.id);
        SuccessResponse.data = todo;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

async function updateTodo(req, res){
    try {
        const todo = await TodoService.updateTodo(req.params.id, req.body);
        console.log(todo);
        SuccessResponse.data = todo;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

async function deleteTodo(req, res){
    try {
        const response = await TodoService.deleteTodo(req.params.id);
        SuccessResponse.data = response;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

module.exports = {
    createTodo,
    getTodos,
    getTodo,
    deleteTodo,
    updateTodo
}
