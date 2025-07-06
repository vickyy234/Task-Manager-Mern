import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Auth from './components/Auth.jsx';
import Dashboard from './components/Dashboard.jsx';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get('/auth/verify');
        if (res.status === 200) {
          console.log('Login Successful');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        navigate('/');
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
