import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineHome } from 'react-icons/ai';
import { MdTaskAlt } from 'react-icons/md';
import { CiUser, CiSettings, CiLogout } from 'react-icons/ci';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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
        <div className="flex items-center gap-2">
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
        <div className="flex items-center gap-2 rounded-full hover:ring">
          <div onClick={() => setShowImageModal(true)}>
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
          </div>
          <div className="user-dropdown relative">
            <span
              className="cursor-pointer pr-2 text-xl"
              title={user.image ? user.username : user.email}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.username || 'User'}
            </span>

            {showDropdown && (
              <div className="absolute right-0 z-50 mt-3 w-35 rounded-md bg-white shadow-lg ring-1 ring-black/10">
                <ul className="flex flex-col gap-2 p-3 text-gray-700">
                  <li
                    className="flex cursor-pointer items-center gap-2 px-2 py-1 text-lg hover:scale-105 hover:bg-gray-100 hover:text-black"
                    onClick={() => {
                      setShowDropdown(false);
                    }}
                  >
                    <CiUser className="h-5 w-5" />
                    Profile
                  </li>
                  <li
                    className="flex cursor-pointer items-center gap-2 px-2 py-1 text-lg hover:scale-105 hover:bg-gray-100 hover:text-black"
                    onClick={() => {
                      setShowDropdown(false);
                    }}
                  >
                    <CiSettings className="h-5 w-5" />
                    Settings
                  </li>
                  <li
                    className="flex cursor-pointer items-center gap-2 px-2 py-1 text-lg hover:scale-105 hover:bg-gray-100 hover:text-black"
                    onClick={() => {
                      setShowDropdown(false);
                      handleLogOut();
                    }}
                  >
                    <CiLogout className="h-5 w-5" />
                    <span>Sign Out</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/5 backdrop-blur-sm">
          <div className="relative">
            <img
              src={user.image}
              alt="Full View"
              title="User profile"
              className="max-h-[80vh] min-h-[300px] max-w-[90vw] min-w-[300px] rounded-lg object-cover shadow-lg"
            />
            <button
              className="absolute top-2 right-2 cursor-pointer text-3xl hover:scale-115 hover:text-red-500"
              title="Close"
              onClick={() => setShowImageModal(false)}
            >
              <IoIosCloseCircleOutline />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
