import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext.jsx';
// import { useUser } from '../contexts/UserContext';

export default function Login() {
  const { login } = useUser();  // Get the login function from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const response = await fetch('/api/v1/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        // Assuming the user data is in result.data.user
        login(result.data.user);  // Store user in context
        localStorage.setItem('user', JSON.stringify(result.data.user)); // Optionally store in localStorage

        alert('Logged in successfully!');
        setTimeout(() => {
          navigate('/');  // Redirect to home or dashboard page
        }, 2000);
      } else {
        alert(result.message || 'Error in logging in! Please try again.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Done
          </button>
        </form>
      </div>
    </div>
  );
}
