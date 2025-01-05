import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../contexts/userContext.jsx'; // Assuming you have a context for user
import AddMedicine from './AddMedicine.jsx';

export default function Sellerdash() {
  const { user, isAuthenticated } = useUser(); // Assuming user context for authentication
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch medicines uploaded by the user
  useEffect(() => {
    if (isAuthenticated) {
      const fetchMedicines = async () => {
        try {
          const response = await axios.get('/api/v1/medicines/user', {
            headers: {
              Authorization: `Bearer ${user.token}`, // Pass JWT token for authentication
            },
          });
          setMedicines(response.data.data.medicines);
        } catch (err) {
          setError('Error fetching medicines');
        } finally {
          setLoading(false);
        }
      };

      fetchMedicines();
    }
  }, [isAuthenticated, user.token]); // Only fetch if user is authenticated

  return (
    <div className="seller-dash-container">
      <div className="flex">
        {/* Left side: Add Medicine Form */}
        <div className="w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-6">Add Medicine</h2>
          <AddMedicine />
        </div>

        {/* Right side: User Uploaded Medicines */}
        <div className="w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-6">Your Uploaded Medicines</h2>

          {loading && <p>Loading your medicines...</p>}
          {error && <p className="text-red-500">{error}</p>}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Display medicines */}
            {medicines.length === 0 ? (
              <p>No medicines uploaded yet. Please add some medicines.</p>
            ) : (
              medicines.map((medicine) => (
                <div key={medicine._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img
                    src={medicine.photo}
                    alt={medicine.name}
                    className="w-full h-48 object-contain rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">{medicine.name}</h3>
                  <p className="text-gray-600">{medicine.salt}</p>
                  <p className="text-xl font-bold text-blue-500 mt-2">${medicine.price}</p>
                  <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Edit
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
