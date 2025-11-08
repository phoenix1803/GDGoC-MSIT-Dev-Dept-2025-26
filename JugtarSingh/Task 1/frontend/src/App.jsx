import { Routes, Route } from 'react-router-dom';
import Todos from './components/Todos';
import CreateTodo from './components/createTodo';
import EditTodo from './components/EditTodo';

function App(){
    return (
       <>
        <Routes>
            <Route path='/' element={<Todos/>} />
            <Route path='/create' element={<CreateTodo/>} />
            <Route path='/edit/:id' element={<EditTodo/>} />
        </Routes>
       </>
    )
}

export default App;