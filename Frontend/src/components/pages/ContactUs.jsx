import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          Have any questions or need assistance? Feel free to reach out to us.
          Our team is always here to help you.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-left">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Get in Touch
            </h3>
            <p className="text-gray-600 mb-4">
              Fill out the form below, and we will get back to you as soon as
              possible.
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-left">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Contact Details
            </h3>
            <p className="text-gray-600 mb-2">
              📍 <strong>Address:</strong> 123 SG Highway, Ahmedabad, Gujarat,
              India
            </p>
            <p className="text-gray-600 mb-2">
              📧 <strong>Email:</strong> support@jobportal.in
            </p>
            <p className="text-gray-600 mb-2">
              📞 <strong>Phone:</strong> +91 98888 88888
            </p>
            <p className="text-gray-600">
              🕒 <strong>Working Hours:</strong> Mon - Sat, 10:00 AM - 7:00 PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
