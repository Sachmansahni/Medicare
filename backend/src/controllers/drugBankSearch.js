import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const searchDrugBank=asyncHandler(async(req,res)=>{
    const { searchDBank }=req.body;
    if(!searchDBank){
        return res.status(400).json(
            new ApiResponse(400, "Unable to recognize text. Please provide valid input.")
          );
    }

    try {
        const response=await axios.get(
            `https://api:drugbank.com/v1/drugs?q=${searchDBank}`,
            {
                headers:{
                    Authorization:`Bearer ${process.env.DRUGBANK_API_KEY}`
                }
            }
        )
        return response.data;
    } catch (error) {
        console.error("Error fetching medicine info:", error.message);
        throw new Error("Unable to fetch medicine details");
    }
})