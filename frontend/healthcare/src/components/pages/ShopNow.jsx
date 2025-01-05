import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShopNow = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]); // State to track items in the cart
  const [selectedMedicine, setSelectedMedicine] = useState(null); // Selected medicine for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [moreInfo, setMoreInfo] = useState(null); // Store extra details from GenAI
  const [isLoadingMoreInfo, setIsLoadingMoreInfo] = useState(false); // Loading state for "More Info"

  // Fetch medicines from API when the component mounts
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('/api/v1/medicines/allmeds'); // Adjust URL if needed
        setMedicines(response.data.data.medicines);
      } catch (err) {
        setError('Error fetching medicines');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  // Function to add a medicine to the cart
  const addToCart = (medicine) => {
    const existingItem = cart.find((item) => item._id === medicine._id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item._id === medicine._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  // Function to fetch more info from the GenAI API
  const getMoreInfoFromAPI = async (medicine) => {
    setIsLoadingMoreInfo(true); // Set loading state to true
    try {
      const response = await axios.get('/api/v1/users/smartsearch', {
        medicineName: medicine.name,
        medicineSalt: medicine.salt,
        medicinePrice: medicine.price,
      });
      setMoreInfo(response.data); // Store the result in state
    } catch (err) {
      console.error('Error fetching additional information:', err);
      setMoreInfo('Failed to fetch more info.');
    } finally {
      setIsLoadingMoreInfo(false); // Set loading state to false after the response
    }
  };

  // Function to open modal and set the selected medicine
  const openModal = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
    setMoreInfo(null); // Clear previous more info
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
    setMoreInfo(null); // Reset additional info on close
  };

  const removeFromCart = (medicineId) => {
    setCart(cart.filter((item) => item._id !== medicineId));
  };

  const increaseQuantity = (medicineId) => {
    setCart(
      cart.map((item) =>
        item._id === medicineId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (medicineId) => {
    setCart(
      cart.map((item) =>
        item._id === medicineId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Shop Now</h2>

      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="flex">
        {/* Medicines Grid */}
        <div className="w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {medicines.map((medicine) => (
              <div
                key={medicine._id}
                className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                onClick={() => openModal(medicine)} // Open modal on tile click
              >
                <img
                  src={medicine.photo}
                  alt={medicine.name}
                  className="w-full h-36 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-800 truncate">{medicine.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{medicine.salt}</p>
                  <p className="mt-2 text-sm font-semibold text-green-600">${medicine.price}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering modal when adding to cart
                    addToCart(medicine);
                  }}
                  className="w-full py-2 bg-blue-500 text-white rounded-b-lg hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="w-1/4 ml-6 bg-gray-50 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Cart</h3>
          <div className="space-y-4">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item._id} className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-gray-700">{item.name}</p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="px-2 py-1 bg-gray-300 text-sm text-gray-800 rounded hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span className="text-sm text-gray-700">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item._id)}
                        className="px-2 py-1 bg-gray-300 text-sm text-gray-800 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 text-sm hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="mt-4 flex justify-between font-semibold">
              <span>Total:</span>
              <span className="text-lg text-green-600">${calculateTotal()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Medicine Details */}
      {isModalOpen && selectedMedicine && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            {/* Close button (×) */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <img
                src={selectedMedicine.photo}
                alt={selectedMedicine.name}
                className="w-48 h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{selectedMedicine.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{selectedMedicine.salt}</p>
              <p className="text-lg font-bold text-green-600 mt-4">${selectedMedicine.price}</p>
              {/* Additional medicine info */}
              <p className="text-sm text-gray-500 mt-2">{selectedMedicine.description || 'No description available.'}</p>
            </div>

            {/* "More Info" Button */}
            <button
              onClick={() => getMoreInfoFromAPI(selectedMedicine)}
              className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {isLoadingMoreInfo ? 'Loading More Info...' : 'More Info'}
            </button>

            {/* More Info Content */}
            {moreInfo && (
              <div className="mt-4 max-h-60 overflow-y-auto p-2 bg-gray-100 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800">Additional Info</h4>
                <p className="text-sm text-gray-600">{moreInfo}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopNow;
