import React from 'react'
import {useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/CreateTodo.css';
import '../styles/components.css';

function CreateTodo() {
  const navigate = useNavigate();
  const [task , setTask] = useState('');
  const [description , setDescription] = useState('');

  async function handleOnSubmit(e){
    e.preventDefault();
    // basic validation
    if (!task.trim()) return;
    await axios.post('http://localhost:8080/api/v1/todos', {
      task,
      description
    });
    navigate('/');
  }

  return (
    <div className="create-todo-container">
      <h2>Create a new Task</h2>
      <form onSubmit={handleOnSubmit} className="form-row" aria-label="Create todo form">
        <div>
          <label htmlFor="task" className="form-label">Enter Your Task</label>
          <input id="task" name="task" type="text" className="form-control" placeholder="e.g. Buy groceries" value={task} onChange = {(e) =>{setTask(e.target.value)}}/>
        </div>
        <div>
          <label htmlFor="description" className="form-label">Description</label>
          <input id="description" name="description" type="text" className="form-control" placeholder="Optional details" value={description} onChange = {(e) =>{setDescription(e.target.value)}}/>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default CreateTodo
