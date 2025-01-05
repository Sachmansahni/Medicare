import mongoose from "mongoose";

// Define the schema for a medicine
const medSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: true, // Assuming photo URL should be required, feel free to modify if not
  },
  name: {
    type: String,
    required: true,
    lowercase: true, // Ensures name is saved in lowercase
    trim: true, // Ensures no leading or trailing spaces
  },
  salt: {
    type: String,
    required: true,
    lowercase: true, // Ensures salt content is saved in lowercase
    trim: true, // Ensures no leading or trailing spaces
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensure the price is not negative
  },
  seller: {
    type: String,
    required: true,
    trim: true, // To remove any leading/trailing whitespace from seller's name
  },
  address: {
    type: String,
    trim: true, // For address, ensuring no leading/trailing spaces
  },
  category: {
    type: String,
    required: true,
    enum: ['Pain Relief', 'Antibiotics', 'Vitamins', 'Cold & Flu', 'Diabetes', 'Skin Care', 'Other'], // Add validation for category
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the date when the document is created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically sets the date when the document is updated
  },
});

// Middleware to update `updatedAt` on every update operation
medSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model from the schema
export const Med = mongoose.model("Med", medSchema);
