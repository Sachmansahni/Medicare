import React, { useState } from 'react';
import axios from 'axios';

const AddMedicine = () => {
  const [medicine, setMedicine] = useState({
    photo: '',
    name: '',
    salt: '',
    price: '',
    category: '', // New field for category
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine({
      ...medicine,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!medicine.photo || !medicine.name || !medicine.salt || !medicine.price || !medicine.category) {
      setError('All fields are required');
      return;
    }

    // Price validation to ensure it's a positive number
    if (medicine.price <= 0) {
      setError('Price must be a positive number');
      return;
    }

    try {
      // Make POST request to backend
      const response = await axios.post('/api/v1/medicines/addmed', medicine);
      setSuccessMessage('Medicine added successfully');
      setMedicine({
        photo: '',
        name: '',
        salt: '',
        price: '',
        category: '', // Reset category field after successful submit
      });
      setError('');
    } catch (err) {
      setError('Error adding medicine');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="max-w-md w-full bg-white p-4 rounded-lg shadow-xl shadow-blue-500/20 overflow-auto">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-3">Add New Medicine</h2>

        {error && <div className="text-red-500 text-sm mb-3 p-2 border border-red-300 rounded-md bg-red-50">{error}</div>}
        {successMessage && <div className="text-green-500 text-sm mb-3 p-2 border border-green-300 rounded-md bg-green-50">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Medicine Photo URL</label>
            <input
              type="url"
              name="photo"
              value={medicine.photo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter medicine photo URL"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
            <input
              type="text"
              name="name"
              value={medicine.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter medicine name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Salt Content</label>
            <input
              type="text"
              name="salt"
              value={medicine.salt}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter salt content"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={medicine.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Category field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={medicine.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Pain Relief">Pain Relief</option>
              <option value="Antibiotics">Antibiotics</option>
              <option value="Vitamins">Vitamins</option>
              <option value="Cold & Flu">Cold & Flu</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Skin Care">Skin Care</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Medicine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;
