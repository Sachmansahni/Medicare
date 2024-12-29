import axios from "axios";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const searchOpenFda = asyncHandler(async (req, res) => {
    const { searchQuery } = req.body;
    // searchQuery="dolo"

    if (!searchQuery) {
        return res.status(400).json(
            new ApiResponse(400, "Unable to recognize text, please provide valid input.")
        );
    }

    try {
        const response = await axios.get(
            `https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:${encodeURIComponent(searchQuery)}&limit=1`
        );

        return res.status(200).json(
            new ApiResponse(200, "Success", response.data)
        );
    } catch (error) {
        console.error("Error in fetching medicine info:", error.message);

        if (error.response) {
            return res.status(error.response.status).json(
                new ApiResponse(error.response.status, error.response.data.error.message)
            );
        }

        return res.status(500).json(
            new ApiResponse(500, "Unable to fetch medicine details")
        );
    }
});

export { searchOpenFda };
