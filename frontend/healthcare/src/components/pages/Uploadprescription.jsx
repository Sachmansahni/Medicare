import React, { useState } from "react";
import Tesseract from "tesseract.js";
import axios from "axios"; // Import axios

export default function UploadPrescription() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileInput = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const extractText = async () => {
    if (!file) {
      alert("Please select or drop a file first!");
      return;
    }

    setLoading(true);
    setText("");
    setSearchResults(null);
    setError(null);

    try {
      const result = await Tesseract.recognize(file, "eng", {
        logger: (info) => console.log(info),
      });
      const extractedText = result.data.text;
      setText(extractedText);

      // Send the extracted text to the smart search API using axios
      const apiResponse = await searchAPI(extractedText);
      setSearchResults(apiResponse);
    } catch (error) {
      console.error("Error extracting text", error);
      setText("Failed to extract text from the image");
    } finally {
      setLoading(false);
    }
  };

  // Function to call the smart search API using axios and GET method with query parameters
  const searchAPI = async (text) => {
    try {
      const response = await axios.get(`/api/v1/users/smartsearch2`, {
        params: { query: text },
      });

      if (response.status === 200) {
        // Log the response data to check its structure
        console.log("API Response:", response.data);
        return response.data;
      } else {
        throw new Error("Error fetching search results");
      }
    } catch (error) {
      console.error("Error calling the smart search API", error);
      setError("Failed to fetch search results");
      return null;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <label
          className="w-80 h-40 border-2 border-dashed border-blue-500 flex items-center justify-center text-blue-500 rounded cursor-pointer mb-4"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          htmlFor="file-input"
        >
          {file ? `Selected: ${file.name}` : "Drag & Drop your image here or click to upload"}
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />
      </div>

      <button
        onClick={extractText}
        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Extracting text... " : "Get References"}
      </button>

      <div className="flex justify-between mt-6 gap-6">
        {/* Extracted Text Section */}
        <div className="flex-1 bg-gray-100 p-4 rounded shadow-md">
          {text && (
            <>
              <h3 className="font-bold text-lg">Extracted Text</h3>
              <p className="text-sm text-gray-700">{text}</p>
            </>
          )}
        </div>

        {/* Search Results Section */}
        <div className="flex-1 bg-green-100 p-4 rounded shadow-md">
          {searchResults && (
            <>
              <h3 className="font-bold text-lg">Search Results</h3>
              {Array.isArray(searchResults.data) ? (
                <ul className="list-disc pl-5">
                  {searchResults.data?.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {item.title} {/* Customize based on your API response structure */}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-700">No results found or invalid data format.</p>
              )}
            </>
          )}

          {error && (
            <div className="mt-2 bg-red-100 p-2 text-red-600 rounded">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
