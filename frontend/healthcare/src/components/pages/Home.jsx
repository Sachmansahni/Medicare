import React from 'react';

export default function Home() {
  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to MedCare!
        </h1>
        <p className="text-gray-600 text-lg mb-6 max-w-3xl">
          Revolutionizing healthcare with cutting-edge technology. Upload your prescription or scan a medicine to get instant, accurate suggestions tailored to your needs.
        </p>
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="bg-gray-100 text-gray-600 py-3 px-6 rounded-lg text-lg hover:bg-gray-200 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                AI Medicine Scanner
              </h3>
              <p className="text-gray-600">
                Snap a photo of your medicine, and our AI instantly identifies it, providing detailed information about usage, dosage, and alternatives.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Smart Prescription Analysis
              </h3>
              <p className="text-gray-600">
                Upload your prescription, and we’ll suggest the most cost-effective and accurate medicines based on your needs.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Personalized Health Recommendations
              </h3>
              <p className="text-gray-600">
                Get smart suggestions tailored to your medical history and preferences, ensuring optimal care and convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-blue-100 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Fast & Reliable</h3>
              <p className="text-gray-600">
                Our platform delivers real-time results, helping you save time and make informed decisions.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Affordable Solutions</h3>
              <p className="text-gray-600">
                We prioritize cost-effectiveness, ensuring affordable healthcare options for everyone.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">User-Friendly</h3>
              <p className="text-gray-600">
                Our interface is designed to be intuitive, making it easy for anyone to navigate and use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Take Control of Your Health</h2>
          <p className="text-lg text-gray-700 mb-6">
            Join MedCare today and experience the future of healthcare. Whether you’re managing your prescriptions or seeking detailed medicine information, we’re here to help.
          </p>
          <button className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition shadow-sm">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}
