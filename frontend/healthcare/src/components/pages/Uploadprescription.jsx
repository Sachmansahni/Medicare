import React, { useState } from "react";
import Tesseract from 'tesseract.js'


export default function Uploadprescription() {
  const [file, setFile] = useState(null);
  const [text,setText]=useState("");
  const [loading,setLoading]=useState(false);
  
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

  const extractText=async()=>{
    if(!file){
        alert("please select or drop a file first!")
        return;
    }

    setLoading(true);
    setText("");

    try{
        const result=await Tesseract.recognize(file,"eng",{
            logger:(info)=>console.log(info)
        });
        setText(result.data.text);
    }
    catch(error){
        console.error('error extracting text',error);
        setText("failed to extract text from the image");
    }
    finally{
        setLoading(false);
    }
  }

  return (
    <>
    <div className="flex flex-col items-center">
      <label
        className="w-80 h-40 border-2 border-dashed border-blue-500 flex items-center justify-center text-blue-500 rounded cursor-pointer"
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

    <button onClick={extractText} 
    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    disabled={loading}>
        {loading?"Extracting text... ": "Get References"}
    </button>

    {text && (
        <div className="mt-4 p-4 bg-gray-100 text-black rounded w-80">
          <h3 className="font-bold">Extracted Text</h3>
          <p>{text}</p>
        </div>
      )}
    </>
  );
}
