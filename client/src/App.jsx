import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth.jsx';
import TaskManager from './components/Task.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/home' element={<TaskManager />} />
      </Routes>
    </>
  )
}

export default App