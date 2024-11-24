import React from 'react';

export default function Login() {
  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Login</h1>
        <form action="" className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email or phone number"
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
