import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";

const smartSearch = asyncHandler(async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const { search } = req.body;

  if (!search) {
    return res.status(400).json(
      new ApiResponse(400, "Unable to recognize text. Please provide valid input.")
    );
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", 
        messages: [{ role: "user", content: search }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        timeout:100000
      }
    );

    const completion = response.data.choices[0].message.content;

  
    return res.status(200).json(
      new ApiResponse(200, "Success", {
        completion: completion,
      })
    );
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json(
      new ApiResponse(500, "Error fetching response from OpenAI", {
        error: error.message || "An unknown error occurred",
      })
    );
  }
});

export { smartSearch };
