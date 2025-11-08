import React  from 'react'
 import { useNavigate } from 'react-router-dom';
import Button from './Button';
import '../styles/components.css';
import { Link } from 'react-router-dom';

function Todo({ todo , onClickDelete  }) {
    const navigate = useNavigate();
    return (
        <div className="card todo-card">
            <div className="card-body">
                <h5 className="card-title">{todo.task}</h5>
                <p className="card-text">{todo.description}</p>
                <Button className='btn' type="button" varient="btn-danger" value="Delete" onClick={(e) => onClickDelete(e, todo.id)} />
                 <Link to={`/edit/${todo.id}`}><Button type="button" varient="btn-primary" value="Edit" /></Link>
            </div>
        </div>
    )
}

export default Todo
