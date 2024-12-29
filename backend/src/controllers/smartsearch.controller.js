import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables from a .env file
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const smartSearch = async (req, res) => {
  try {
    const prompt = "Create 5 funny and witty jokes about generative AI";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (err) {
    console.log(err);
    res.send("Unexpected Error!!!");
  }
};

export { smartSearch };
