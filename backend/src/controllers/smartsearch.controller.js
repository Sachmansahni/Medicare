import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables from a .env file
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const smartSearch = async (req, res) => {
  try {
    const { name, salt, price } = req.body; // Extract medicine details

    const prompt = `Generate detailed information and additional insights for the following medicine: 
      Name: ${name}, Salt Content: ${salt}, Price: ${price}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (err) {
    console.log(err);
    res.send("Unexpected Error!!!");
  }
};

const smartSearch2 = async (req, res) => {
  try {
    
    const { query } = req.query;

    
    if (!query) {
      return res.status(400).send({ error: 'No data provided' });
    }

    const prompt = `I am giving you some data that I have extracted from a medicine or a medical report, please give me all the info about it. extracted text -> ${query}`;

    const result = await model.generateContent(prompt);

    
    const text = result.response ? result.response : result;

    console.log(text);

    res.status(200).send({ data: text });

  } catch (err) {
    console.error('Error in smartSearch2:', err);
    res.status(500).send({ error: 'Unexpected error occurred' });
  }
};




export { smartSearch,smartSearch2 };
