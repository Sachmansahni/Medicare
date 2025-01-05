import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext'; // Import the useUser hook

export default function Header() {
  const { user, isAuthenticated, logout } = useUser(); // Get user data and authentication state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  const navigateToAddMedicine = () => {
    navigate('/sellerDash'); // Navigate to the add medicine page
  };

  const handleLogout = () => {
    logout(); // Logout using context, which also removes from localStorage
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <span className="flex items-center">
            <img
              src="/medical-logo.png"
              alt="Medical Logo"
              className="w-8 h-8 mr-2"
            />
            MedCare
          </span>
        </div>

        {/* Hamburger Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-blue-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Links */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:block absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none`}
        >
          <ul className="flex flex-col md:flex-row gap-6 text-lg text-gray-700 items-center px-6 md:px-0 py-4 md:py-0">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Search</Link></li>
            <li><Link to="/uploadPrescription">Upload</Link></li>
            <li><Link to="/contact">Help</Link></li>
            <li><Link to="/about">Services</Link></li>
          </ul>
        </div>

        {/* Auth Buttons / User Info */}
        <div className="hidden md:flex gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-800 font-semibold">Welcome, {user?.name}</span>

              {/* Role-based Navigation */}
              {user?.userType === 'seller' && (
                <button 
                  onClick={navigateToAddMedicine}
                  className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition shadow-sm"
                >
                  Seller Dash
                </button>
              )}
              
              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={navigateToLogin}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition shadow-sm"
              >
                Login
              </button>
              <button 
                onClick={navigateToSignup}
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition shadow-sm"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Auth Buttons */}
      {isMenuOpen && (
        <div className="block md:hidden px-6 py-4 bg-white shadow-md">
          {isAuthenticated ? (
            <>
              <span className="block mb-3 text-gray-800 font-semibold">Welcome, {user?.name}</span>

              {/* Role-based Navigation */}
              {user?.role === 'seller' && (
                <button
                  onClick={navigateToAddMedicine}
                  className="w-full mb-3 px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition shadow-sm"
                >
                  Add Medicine
                </button>
              )}
              
              <button
                onClick={handleLogout}
                className="w-full mb-3 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={navigateToLogin}
                className="w-full mb-3 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition shadow-sm"
              >
                Login
              </button>
              <button
                onClick={navigateToSignup}
                className="w-full px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition shadow-sm"
              >
                Signup
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
