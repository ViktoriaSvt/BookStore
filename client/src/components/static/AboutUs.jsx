import React from "react";

export default function AboutUs() {
  return (
    <section className="bg-gray-50 mb-32">

      {/* Updated Header Section */}
      <div className="relative mb-16 bg-gradient-to-r from-indigo-600 to-blue-500">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative text-center text-white px-4 sm:px-6 lg:px-8 py-32">
          <h2 className="text-5xl font-bold font-manrope mb-6">
            Empowering Change, One Step at a Time
          </h2>
          <p className="text-xl mb-6">
            At [Company Name], we're passionate about creating solutions that help people thrive in a dynamic world. Join us in shaping the future!
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h3 className="text-3xl font-semibold text-gray-900 mb-6">
            Our Mission
          </h3>
          <p className="text-xl text-gray-700">
            At [Company Name], our mission is to provide exceptional products and services that help our customers achieve their goals and lead better lives. We aim to be a leading innovator in our industry, continuously improving and offering value through quality, customer satisfaction, and trust.
          </p>
        </div>

        {/* Company Goals Section with Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="text-center p-6 bg-white shadow-lg rounded-lg">
            <i className="fas fa-lightbulb text-4xl text-indigo-600 mb-4"></i>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Innovation
            </h4>
            <p className="text-gray-600">
              We focus on continuous innovation and finding new ways to improve our products and services to meet the ever-evolving needs of our customers.
            </p>
          </div>

          <div className="text-center p-6 bg-white shadow-lg rounded-lg">
            <i className="fas fa-users text-4xl text-indigo-600 mb-4"></i>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Customer Satisfaction
            </h4>
            <p className="text-gray-600">
              We prioritize our customers' needs and aim to provide an excellent experience from the moment they engage with our brand.
            </p>
          </div>

          <div className="text-center p-6 bg-white shadow-lg rounded-lg">
            <i className="fas fa-leaf text-4xl text-indigo-600 mb-4"></i>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Sustainability
            </h4>
            <p className="text-gray-600">
              We believe in promoting sustainability through eco-friendly practices, ensuring a positive impact on the planet while delivering value.
            </p>
          </div>

          <div className="text-center p-6 bg-white shadow-lg rounded-lg">
            <i className="fas fa-cogs text-4xl text-indigo-600 mb-4"></i>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Excellence
            </h4>
            <p className="text-gray-600">
              We strive for excellence in everything we do, ensuring that every product and service meets the highest standards of quality and reliability.
            </p>
          </div>
        </div>

        {/* Team Section with Grid Layout */}
        <div className="mt-16 text-center p-6">
          <h3 className="text-3xl font-semibold text-gray-900 mb-6">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Jane Doe
              </h4>
              <p className="text-gray-600">CEO & Founder</p>
            </div>

            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                John Smith
              </h4>
              <p className="text-gray-600">Chief Marketing Officer</p>
            </div>

            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Emily Johnson
              </h4>
              <p className="text-gray-600">Lead Developer</p>
            </div>

            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Michael Brown
              </h4>
              <p className="text-gray-600">Head of Operations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
