// src/pages/CartPage.js
import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    
    // Calculate total price
    const totalPrice = savedCart.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalPrice);
  }, []);

  const removeFromCart = (medicineId) => {
    const updatedCart = cart.filter((item) => item._id !== medicineId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
  };

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-red-500">Your cart is empty.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Loop through cart items */}
            {cart.map((medicine) => (
              <div key={medicine._id} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={medicine.photo}
                  alt={medicine.name}
                  className="w-full h-48 object-contain rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{medicine.name}</h3>
                <p className="text-gray-600">{medicine.salt}</p>
                <p className="text-xl font-bold text-blue-500 mt-2">${medicine.price}</p>
                <button
                  className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => removeFromCart(medicine._id)} // Remove from Cart on click
                >
                  Remove from Cart
                </button>
              </div>
            ))}
          </div>

          {/* Display total price */}
          <div className="mt-8 text-xl font-semibold text-gray-800 text-right">
            <p>Total Price: ${total.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
