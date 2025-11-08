import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/CreateTodo.css';
import '../styles/components.css';

function EditTodo(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchTodo = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/todos/${id}`);
        const data = res.data.data || res.data;
        setTask(data.task || '');
        setDescription(data.description || '');
      } catch (err) {
        // Could show a toast or redirect; keep simple for now
        console.error('Failed to fetch todo', err);
        setError('Failed to load todo.');
      }
    };
    fetchTodo();
  }, [id]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!task.trim()) {
      setError('Task must not be empty');
      return;
    }
    if (!id) {
      setError('Missing todo id');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.put(`http://localhost:8080/api/v1/todos/${id}`, { task, description });
      if (res && res.status >= 200 && res.status < 300) {
        navigate('/');
      } else {
        console.error('Unexpected response updating todo', res);
        setError('Failed to update todo');
      }
    } catch (err) {
      console.error('Failed to update todo', err);
      setError(err?.response?.data?.message || 'Failed to update todo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-todo-container">
      <h2>Edit Task</h2>
      <form onSubmit={handleOnSubmit} className="form-row" aria-label="Edit todo form">
        <div>
          <label htmlFor="task" className="form-label">Enter Your Task</label>
          <input id="task" name="task" type="text" className="form-control" placeholder="e.g. Buy groceries" value={task} onChange = {(e) =>{setTask(e.target.value)}}/>
        </div>
        <div>
          <label htmlFor="description" className="form-label">Description</label>
          <input id="description" name="description" type="text" className="form-control" placeholder="Optional details" value={description} onChange = {(e) =>{setDescription(e.target.value)}}/>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Updating…' : 'Update'}</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/') } style={{ marginLeft: '8px' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditTodo;