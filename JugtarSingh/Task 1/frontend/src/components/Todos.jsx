import React , {useState , useEffect} from 'react'
import axios from 'axios';
import Todo from './Todo';
import Navbar from './NavBar';
import '../styles/components.css';

function Todos(){
    const [todos,setTodos] = useState([]);
    useEffect(() =>{
        const fetchTodos = async () =>{
            const res = await axios.get('http://localhost:8080/api/v1/todos');
            const task = res.data;
            setTodos(task.data);
        }
        fetchTodos();
    },[])

    function handleDelete(e,id){
        e.preventDefault();
        console.log(id);
        const res = axios.delete(`http://localhost:8080/api/v1/todos/${id}`);
        const newTodos = todos.filter((todo)=>{ return todo.id !== id});
        setTodos(newTodos);
    }

    return (
        <>
        <Navbar/>
        <div className="container-centered">
          <h4>All Todo Task</h4>
          {(todos.length === 0 ) ? <p>No Task</p> : 
            todos.map((todo)=>{
                return <Todo key={todo.id} todo={todo } onClickDelete ={handleDelete} />
            })
          }
        </div>
        </>
    )
}

export default Todos