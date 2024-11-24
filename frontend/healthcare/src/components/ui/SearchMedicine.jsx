import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js'

export default function SearchMedicine() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);  

  // Capture the image
  const captureImage = () => {
    const capturedImage = webcamRef.current.getScreenshot();
    setImage(capturedImage);
    setText("");
  };

  const preprocessImage = (imageSrc) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
  
    return new Promise((resolve) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Convert to grayscale
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const gray = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
          data[i] = data[i + 1] = data[i + 2] = gray;
        }
        ctx.putImageData(imageData, 0, 0);
        
        resolve(canvas.toDataURL());
      };
    });
  };
  
  const extractText = async () => {
    setLoading(true);
    try {
      const processedImage = await preprocessImage(image);
      const result = await Tesseract.recognize(processedImage, 'eng', {
        logger: (info) => console.log(info),
      });
      setText(result.data.text);
    } catch (error) {
      setText("Error extracting text");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      {!image ? (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-80 h-60 border-2 border-gray-400 rounded"
        />
      ) : (
        <img 
          src={image} 
          alt="Captured" 
          className="w-80 h-60 border-2 border-gray-400 rounded"
        />
      )}

      <div className="mt-4 space-x-2">
        {!image ? (
          <button 
            onClick={captureImage} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Capture Image
          </button>
        ) : (
          <>
          <button 
            onClick={() => setImage(null)} 
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Retake
          </button>
          <button
          onClick={extractText}
          className='bg-green-500 text-white px-4 py-2 rounded'
          disabled={loading}
          >
            {loading ? "extracting..." : "extract text"}
          </button>
          </>
        )}
      </div>
      {text && (
        <div className='mt-4 p-4 bg-gray-100 text-black rounded w-80 text-sm'>
          <h3 className='font-bold'>extracted text</h3>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}
