import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiUser, FiLogOut } from 'react-icons/fi';

const Navbar = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">TaskMaster</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profile Section */}
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 text-sm font-medium">
                  Welcome, {user?.name || 'User'}
                </span>
                <img
                  className="h-8 w-8 rounded-full object-cover border-2 border-gray-300"
                  src={user?.avatar || 'https://via.placeholder.com/32x32?text=U'}
                  alt="Profile"
                />
                <button
                  onClick={onLogout}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Logout"
                >
                  <FiLogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMobileMenuOpen ? (
                <HiX className="block h-6 w-6" />
              ) : (
                <HiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            <div className="flex items-center px-3 py-2">
              <img
                className="h-10 w-10 rounded-full object-cover border-2 border-gray-300"
                src={user?.avatar || 'https://via.placeholder.com/40x40?text=U'}
                alt="Profile"
              />
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {user?.name || 'User'}
                </div>
                <div className="text-sm text-gray-500">
                  {user?.email || 'user@example.com'}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <button
                onClick={onLogout}
                className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <FiLogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;