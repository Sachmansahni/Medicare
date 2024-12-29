import axios from "axios";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const searchDrugBank = asyncHandler(async (req, res) => {
    const { searchQuery } = req.body;

    if (!searchQuery) {
        return res.status(400).json(
            new ApiResponse(400, "Unable to recognize text. Please provide valid input.")
        );
    }

    try {
        const response = await axios.get(
            `https://api.drugbank.com/v1/drugs?q=${searchQuery}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.DRUGBANK_API_KEY}`
                }
            }
        );
        return res.status(200).json(
            new ApiResponse(200, "Success", response.data)
        );
    } catch (error) {
        console.error("Error fetching medicine info:", error.message);
        return res.status(500).json(
            new ApiResponse(500, "Unable to fetch medicine details")
        );
    }
});

export { searchDrugBank };
