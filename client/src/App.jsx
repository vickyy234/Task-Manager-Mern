import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Auth from './components/Auth.jsx';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import Temp from './components/Temporary.jsx';
import Profile from './components/Profile.jsx';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Temp />} />
        <Route path="/tasks" element={<Temp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
