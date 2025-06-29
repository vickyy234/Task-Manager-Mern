import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Auth />} />
      </Routes>
    </>
  )
}

export default App