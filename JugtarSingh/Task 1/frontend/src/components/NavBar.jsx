import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components.css';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary app-navbar">
            <div className="container-fluid">
                <a className="navbar-brand mx-4" href="/">Todo List</a>
                <Link to='/create' className='btn btn-success'>Create a new Task</Link>
            </div>
        </nav>
    )
}

export default Navbar;