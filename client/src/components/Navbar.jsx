import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineHome } from 'react-icons/ai';
import { MdTaskAlt } from 'react-icons/md';
import { CiUser } from 'react-icons/ci';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get('/utils/getuserdetails');
        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        navigate('/');
      }
    };

    getUserDetails();
  }, []);

  const handleLogOut = async () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (!confirmLogout) return;

    try {
      const res = await axios.get('/utils/logout');
      alert(res.data.message);
      navigate('/');
    } catch (err) {
      console.error(
        'Logout failed:',
        err.response?.data?.message || err.message,
      );
    }
  };

  return (
    <>
      <nav className="flex h-fit items-center justify-between bg-white px-5 shadow-md">
        <div className="flex items-center gap-2" onClick={handleLogOut}>
          <img
            src="./logo.png"
            alt="App Logo"
            title="Task Manager"
            className="h-20 w-20 cursor-pointer transition duration-300 hover:scale-105"
          />
          <span className="cursor-pointer text-2xl font-bold">
            Task Manager
          </span>
        </div>
        <ul className="text-decoration-none flex gap-4">
          <li className="flex cursor-pointer items-center gap-2 text-xl text-gray-500 transition duration-300 hover:scale-105 hover:text-gray-700">
            <AiOutlineHome className="h-4 w-4" />
            Dashboard
          </li>
          <li className="flex cursor-pointer items-center gap-2 text-xl text-gray-500 transition duration-300 hover:scale-105 hover:text-gray-700">
            <MdTaskAlt className="h-4 w-4" />
            Tasks
          </li>
          <li className="flex cursor-pointer items-center gap-2 text-xl text-gray-500 transition duration-300 hover:scale-105 hover:text-gray-700">
            <CiUser className="h-4 w-4" />
            Profile
          </li>
        </ul>
        <div
          className="flex items-center gap-2 rounded-full hover:ring"
          onClick={() => setShowImageModal(true)}
        >
          {user.image ? (
            <img
              src={user.image}
              alt="User logo"
              title={user.email}
              className="h-12 w-12 cursor-pointer rounded-full object-cover"
            />
          ) : (
            <CiUser
              className="h-4 w-4 cursor-pointer transition duration-300 hover:scale-105"
              alt="User logo"
              title={user.email}
            />
          )}
          <span
            className="cursor-pointer pr-2 text-xl"
            title={user.image ? user.username : user.email}
          >
            {user.username || 'User'}
          </span>
        </div>
      </nav>

      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100">
          <div className="relative">
            <img
              src={user.image}
              alt="Full View"
              title="User profile"
              className="max-h-[80vh] min-h-[300px] max-w-[90vw] min-w-[300px] rounded-lg object-cover shadow-lg"
            />
            <button
              className="absolute top-2 right-2 cursor-pointer rounded-full bg-white p-1 text-3xl text-black shadow hover:bg-gray-200 hover:ring"
              title="Close"
              onClick={() => setShowImageModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
