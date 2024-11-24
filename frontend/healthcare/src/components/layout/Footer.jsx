import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-blue-50 text-gray-700 py-8">
      <div className="container mx-auto grid md:grid-cols-3 gap-8 px-6">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">MedCare</h2>
          <p>
            Providing trusted medical services and care for a healthier you. We
            strive to connect you with the best resources for your well-being.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="hover:text-blue-600 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 transition"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-4">
            Contact Us
          </h3>
          <p>
            <i className="fas fa-map-marker-alt text-blue-600 mr-2"></i>
            123 Wellness Lane, Healthy City, HC 56789
          </p>
          <p>
            <i className="fas fa-phone text-blue-600 mr-2"></i>
            +1 (555) 123-4567
          </p>
          <p>
            <i className="fas fa-envelope text-blue-600 mr-2"></i>
            support@medcare.com
          </p>
        </div>
      </div>

      <div className="border-t mt-8 pt-4 text-center text-gray-500">
        &copy; {new Date().getFullYear()} MedCare. All rights reserved.
      </div>
    </footer>
  );
}
