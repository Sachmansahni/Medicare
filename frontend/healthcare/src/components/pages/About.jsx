import React from 'react';

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* About Us Section */}
      <section className="container mx-auto py-20 px-6 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">About Us</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Welcome to MedCare, your trusted partner in health and well-being.
          Our mission is to simplify healthcare for everyone by providing
          innovative solutions and services. We are dedicated to ensuring
          that you receive the best care through cutting-edge technology
          and a compassionate approach.
        </p>
      </section>

      {/* Our Values Section */}
      <section className="bg-white py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Compassion</h3>
              <p className="text-gray-600">
                We care deeply about our patients and aim to deliver services
                with empathy and understanding.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Our team constantly strives to leverage the latest technology
                to improve healthcare experiences.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Trust</h3>
              <p className="text-gray-600">
                Your trust is our priority. We maintain the highest standards
                of integrity and confidentiality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-700 mb-6">
            Have questions? We’d love to hear from you! Reach out to us for any inquiries or assistance.
          </p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition shadow-sm">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
