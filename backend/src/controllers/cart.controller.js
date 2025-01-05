// cart.controller.js

import { Cart } from "../models/cart.model.js";
import { Med } from "../models/med.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addToCart = asyncHandler(async (req, res) => {
  const { medicineId, quantity } = req.body; // Expecting medicineId and quantity in the request body

  // Check if medicineId is provided
  if (!medicineId || !quantity) {
    throw new ApiError(400, "Medicine ID and quantity are required");
  }

  // Find the medicine by its ID
  const medicine = await Med.findById(medicineId);
  if (!medicine) {
    throw new ApiError(404, "Medicine not found");
  }

  // Check if the user already has a cart
  let cart = await Cart.findOne({ user: req.user._id });

  // If the cart doesn't exist, create a new one
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  // Check if the medicine is already in the cart
  const existingItem = cart.items.find(item => item.medicineId.toString() === medicineId);

  // If it exists, update the quantity
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    // Otherwise, add a new item to the cart
    cart.items.push({ medicineId, quantity });
  }

  // Recalculate the total price of the cart
  cart.totalPrice = cart.items.reduce((acc, item) => acc + (item.quantity * item.medicineId.price), 0);

  // Save the updated cart
  await cart.save();

  // Return the updated cart
  return res.status(200).json(new ApiResponse(200, cart, "Item added to cart successfully"));
});

export { addToCart };
