import { Med } from "../models/med.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addMedicine = asyncHandler(async (req, res) => {
  const { photo, name, salt, price } = req.body;

  if ([photo, name, salt, price].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All medicine details are required");
  }

  const seller=await req.user.name;
  console.log(seller);

  const med = await Med.create({
    photo,
    name,
    salt,
    price,
    seller,
  });

  return res.status(201).json(
    new ApiResponse(200, med, "Medicine added successfully")
  );
});

const fetchAllMedicine = asyncHandler(async (req, res) => {
  const medicines = await Med.find();

  if (medicines.length === 0) {
    throw new ApiError(404, "No medicines available in stock");
  }

  return res.status(200).json(
    new ApiResponse(200, { medicines }, "Medicines fetched successfully")
  );
});

const fetchByUserName = asyncHandler(async (req, res) => {
    // Use the logged-in user's name to fetch their medicines
    const medicines = await Med.find({ seller: req.user.name });
  
    if (medicines.length === 0) {
      throw new ApiError(404, "No medicines uploaded");
    }
  
    return res.status(200).json({
      status: 'success',
      data: { medicines }
    });
  });

const fetchMedByDetails = asyncHandler(async (req, res) => {
  const { name, salt } = req.query; // Use req.query for GET requests

  if (!(name || salt)) {
    throw new ApiError(400, "Please provide some details about the medicine");
  }

  const medicines = await Med.find({
    $or: [{ name }, { salt }],
  });

  if (medicines.length === 0) {
    throw new ApiError(404, "No matches found");
  }

  return res.status(200).json(
    new ApiResponse(200, { medicines }, "Medicines fetched successfully")
  );
});

export { addMedicine, fetchAllMedicine, fetchMedByDetails , fetchByUserName};
