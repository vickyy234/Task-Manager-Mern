import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdTaskAlt } from 'react-icons/md';
import { CiUser, CiSettings, CiLogout } from 'react-icons/ci';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import { CgProfile } from 'react-icons/cg';
import { LiaHomeSolid } from 'react-icons/lia';
import { GrHomeRounded } from 'react-icons/gr';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      console.log(res.data.message);
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
      <nav className="sticky top-0 flex items-center justify-between gap-2 bg-white px-2 shadow-md md:px-5">
        {/* Logo + Title */}
        <div className="flex items-center justify-center gap-2">
          <img
            src="./logo.png"
            alt="App Logo"
            title="Task Manager"
            className="h-12 w-12 cursor-pointer transition duration-500 hover:scale-110 md:h-20 md:w-20"
          />
          <span className="cursor-pointer text-lg font-bold md:text-2xl">
            Task Manager
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="flex hidden gap-4 text-xl text-gray-700 md:flex">
          <li className="flex cursor-pointer items-center gap-2 transition duration-300 hover:scale-105 hover:text-black">
            <LiaHomeSolid className="h-4 w-4" />
            Dashboard
          </li>
          <li className="flex cursor-pointer items-center gap-2 transition duration-300 hover:scale-105 hover:text-black">
            <MdTaskAlt className="h-4 w-4" />
            Tasks
          </li>
          <li className="flex cursor-pointer items-center gap-2 transition duration-300 hover:scale-105 hover:text-black">
            <CiUser className="h-4 w-4" />
            Profile
          </li>
        </ul>

        {/* Hamburger Menu for Mobile */}
        <div className="py-2 md:hidden">
          <button
            className="flex items-center gap-3 text-3xl focus:outline-none"
            title="Toggle Menu"
          >
            <RxHamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)} />
            <div onClick={() => setShowImageModal(true)}>
              {user.image ? (
                <img
                  src={user.image}
                  alt="User logo"
                  title={user.email}
                  className="h-12 w-12 cursor-pointer rounded-full object-cover"
                />
              ) : (
                <CgProfile
                  className="h-10 w-10 cursor-pointer transition duration-300 hover:scale-105"
                  alt="User logo"
                  title={user.email}
                />
              )}
            </div>
          </button>
        </div>

        {/* User Profile and Dropdown */}
        <div className="group flex hidden items-center gap-2 rounded-lg md:flex">
          <div onClick={() => setShowImageModal(true)}>
            {user.image ? (
              <img
                src={user.image}
                alt="User logo"
                title={user.email}
                className="h-12 w-12 cursor-pointer rounded-full object-cover transition duration-300 hover:scale-105"
              />
            ) : (
              <CgProfile
                className="h-12 w-12 cursor-pointer rounded-full object-cover transition duration-300"
                alt="User logo"
                title={user.email}
              />
            )}
          </div>
          <div className="user-dropdown relative">
            <span
              className="cursor-pointer pr-2 text-xl"
              title={user.username}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.username || 'User'}
            </span>
            {showDropdown && (
              <div className="absolute right-0 z-50 mt-3 w-35 rounded-md bg-white shadow-lg ring-1 ring-black/10">
                <ul className="flex flex-col gap-2 p-3 text-lg text-gray-700">
                  <li
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-100 px-2 py-1 transition duration-300 hover:scale-105 hover:bg-gray-400 hover:text-black"
                    onClick={() => {
                      setShowDropdown(false);
                    }}
                  >
                    <CiUser className="h-5 w-5" />
                    Profile
                  </li>
                  <li
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-100 px-2 py-1 transition duration-300 hover:scale-105 hover:bg-gray-400 hover:text-black"
                    onClick={() => {
                      setShowDropdown(false);
                    }}
                  >
                    <CiSettings className="h-5 w-5" />
                    Settings
                  </li>
                  <li
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-100 px-2 py-1 transition duration-300 hover:scale-105 hover:bg-red-400 hover:text-black"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="align-left px-5 py-3 md:hidden">
          <ul className="flex flex-col gap-3 text-gray-700">
            <li
              className="flex w-30 items-center gap-2 rounded-lg bg-gray-100 px-3 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <GrHomeRounded className='h-[16px] w-[16px]'/> Dashboard
            </li>
            <li
              className="flex w-30 items-center gap-2 rounded-lg bg-gray-100 px-3 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <MdTaskAlt /> Tasks
            </li>
            <li
              className="flex w-30 items-center gap-2 rounded-lg bg-gray-100 px-3 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <CiUser /> Profile
            </li>
            <li
              className="flex w-30 items-center gap-2 rounded-lg bg-gray-100 px-3 py-1"
              onClick={() => {
                setIsMenuOpen(false);
                handleLogOut();
              }}
            >
              <CiLogout /> Sign Out
            </li>
          </ul>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/5 backdrop-blur-sm">
          <div className="relative">
            {user.image ? (
              <img
                src={user.image}
                alt="Full View"
                title="User profile"
                className="max-h-[80vh] min-h-[300px] max-w-[90vw] min-w-[300px] rounded-lg object-cover shadow-lg"
              />
            ) : (
              <CgProfile
                className="max-h-[80vh] min-h-[300px] max-w-[90vw] min-w-[300px] rounded-lg object-cover shadow-lg"
                alt="User logo"
                title={user.email}
              />
            )}
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
