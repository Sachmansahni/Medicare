MEDICARE -> YOUR HEALTH PARTNER
------------------------------

Medicare is a web application built using React, Vite, and Node.js. The platform serves as a marketplace and a resource hub for both buyers (patients or consumers) and sellers (pharmacies, medical suppliers, or healthcare providers). Buyers can upload images of prescriptions or medical reports, extract text from them using Tesseract.js (an OCR library), and search for relevant medical information via a Smart Search API. Sellers can offer their products, medications, or services, and buyers can easily search and access relevant information.


This project is designed to facilitate smooth interactions between buyers and sellers, improving access to medical information and products through advanced technology.

Features

-  Image Upload: Buyers can upload prescription or medical report images.
-  Text Extraction: Uses Tesseract.js to extract text from the uploaded image.
-  Smart Search: Extracted text is sent to a backend API that returns relevant information based on the data in the image.



Buyer and Seller Interface:

Buyers can easily search for medical information, medicines, and other related details.
Sellers (e.g., pharmacies) can list products, medicines, or services, and be found by buyers using smart search.

Error Handling: Displays appropriate messages for failed operations (text extraction or search results).
Responsive Design: The application is fully responsive, ensuring it works on both desktop and mobile devices.
Technologies Used
React: A JavaScript library for building user interfaces, used for building the front-end.
Vite: A fast build tool for modern web development that provides fast hot module reloading (HMR) and builds optimized production assets.
Tesseract.js: A JavaScript library that enables optical character recognition (OCR) for text extraction from images.
Axios: A promise-based HTTP client for making API requests to the backend.
Node.js: A JavaScript runtime for building the backend of the application.
Express: A web framework for Node.js used to build the API routes.
Project Components
Frontend (React + Vite)
The frontend of this application is built with React and uses Vite for faster build and development times. The main functionalities revolve around uploading images, showing the extracted text, and displaying results from the smart search API.

Key Components->
    -   App.js:

The entry point for the application. It sets up the basic layout and routes.
UploadPrescription.js:

This component handles the uploading of images (prescriptions/medical reports), extracts the text using Tesseract.js, and then sends the extracted text to the backend for a smart search.
It also handles the UI elements for file drag-and-drop, file selection, and displays the results or any errors.
Tesseract.js:

The Tesseract.js library is used for OCR (optical character recognition) to extract text from the uploaded image. This text is then sent to the backend API for processing.
axios:

Used to send HTTP requests to the backend API (Smart Search) to retrieve relevant results based on the extracted text.
Tailwind CSS:

The styling of the components is managed using Tailwind CSS, a utility-first CSS framework. It allows for rapid styling and easy customization of the UI.
File Upload Handling:

The frontend supports drag-and-drop file upload as well as traditional file input methods.
Search Results Display:

The results from the backend (after performing a smart search) are displayed alongside the extracted text. If no results are found, an error message is shown.
Backend (Node.js + Express)
The backend of the application is built using Node.js and Express, which serves as the API for performing smart searches on the extracted text. The backend can process the extracted data and return useful information, making it an essential part of the app.

Key Features of the Backend
Smart Search Endpoint (/api/v1/users/smartsearch2):

This endpoint receives the extracted text via a GET request and processes the information to return relevant search results. The search is done based on a model or predefined logic that parses the extracted text and finds matching entries.
Text Processing:

The backend uses a model (could be a machine learning model, AI service, or simple text-matching logic) to perform a smart search based on the extracted text from the image. It returns a list of relevant information (e.g., medicine names, medical conditions, etc.).
API Route:

Route: /api/v1/users/smartsearch2?query=<extracted-text>
This route takes a query parameter, which is the extracted text from the image, and returns a JSON object containing the relevant information.
Error Handling:

The backend is designed to handle errors gracefully. If the smart search fails, it responds with an appropriate error message to be displayed on the frontend.
Folder Structure
graphql
Copy code
src/
  ├── assets/          # Images, fonts, and other static assets
  ├── components/      # React components (e.g., UploadPrescription.js)
  ├── App.js           # Main component rendering the application
  ├── main.js          # Entry point for React app
  ├── styles/          # Global styles and custom CSS (Tailwind setup)
  └── utils/           # Utility functions and helpers (e.g., axios requests)
public/
  ├── index.html       # HTML file to be served
  └── favicon.ico      # Favicon for the application
backend/
  ├── controllers/      # Functions to handle API requests
  ├── models/           # If using database models or AI models
  ├── routes/           # Express route definitions
  ├── app.js            # Main entry point for the Express server
  ├── config/           # Configuration files (e.g., database, AI model)
  ├── services/         # External services like smart search, AI models
  └── utils/            # Utility functions and helpers
How It Works
1. Image Upload (Frontend)
The user can upload a prescription or medical report image by either dragging and dropping the image or selecting it using a file input.
Once the image is uploaded, Tesseract.js is used to process the image and extract the text.
2. Text Extraction (Frontend)
Tesseract.js processes the uploaded image in the browser and extracts any text it detects in the image. This text is displayed to the user and used for the next step.
3. Smart Search (Backend)
The extracted text is sent to the backend via an HTTP GET request to the /api/v1/users/smartsearch2 endpoint.
The backend processes the extracted text to perform a smart search (either via a model or a search algorithm).
Relevant search results (such as medicine names, diseases, or any related information) are returned as a JSON response.
4. Displaying Results (Frontend)
The frontend receives the smart search results and displays them alongside the extracted text.
If no results are found, an error message is shown to the user.
5. Buyer and Seller Interaction
Buyers can access information about medical products, medicines, and services based on the search results.
Sellers can provide their product details, availability, and more, making it easy for buyers to find relevant products, services, or treatments.
Setup and Installation
Prerequisites
Node.js (v16 or higher)
npm (Node Package Manager)
Step 1: Clone the Repository
Clone the repository to your local machine:

bash
Copy code
git clone <your-repository-url>
cd <project-folder>
Step 2: Install Frontend Dependencies
Navigate to the frontend directory and install the dependencies:

bash
Copy code
cd frontend
npm install
Step 3: Install Backend Dependencies
Navigate to the backend directory and install the dependencies:

bash
Copy code
cd backend
npm install
Step 4: Run the Development Server (Frontend)
Run the frontend development server using Vite:

bash
Copy code
cd frontend
npm run dev
Step 5: Run the Backend Server (Node.js/Express)
Run the backend server using Node.js:

bash
Copy code
cd backend
npm run dev
The frontend will be accessible at http://localhost:3000/, and the backend API will run on http://localhost:5000/.

API Documentation
/api/v1/users/smartsearch2
Method: GET
Query Params:
query: The extracted text from the prescription or medical report image.
Example Request:

http
Copy code
GET /api/v1/users/smartsearch2?query=paracetamol
Example Response:

json
Copy code
{
  "data": [
    {
      "title": "Paracetamol - A pain reliever",
      "description": "Paracetamol is a medication used to treat pain and fever."
    },
  ]
}
     
