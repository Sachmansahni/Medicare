import React, { useState } from 'react';

export default function Contact() {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('Please fill out all fields.');
      return;
    }

    // You can replace this with actual form submission logic (e.g., an API request)
    setSubmitStatus('Sending your message...');

    try {
      // Simulating a successful form submission
      setTimeout(() => {
        setSubmitStatus('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }, 1500);
    } catch (error) {
      setSubmitStatus('There was an error sending your message. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>

      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* Contact Form */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-medium">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                placeholder="Enter your message"
              ></textarea>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Send Message
              </button>
            </div>
          </form>

          {submitStatus && (
            <p className="mt-4 text-center text-lg font-semibold text-green-600">
              {submitStatus}
            </p>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Our Contact Information</h2>
          <p className="text-lg mb-4">
            If you have any questions or need support, feel free to reach out to us through the contact form or use the details below:
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Address</h3>
              <p>1234 Medicare Street, City, Country</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p>support@medicare.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
