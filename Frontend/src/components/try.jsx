import { FaBriefcase, FaUserGraduate, FaHandshake } from "react-icons/fa";

const HomePageSection = () => {
  return (
    <div className="bg-gradient-to-b from-white via-gray-100 to-gray-200 text-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#4a3a67] to-[#431692] text-white py-16 px-6 md:px-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Your Gateway to Dream Careers
        </h1>
        <p className="text-lg md:text-xl">
          Empowering students and recruiters to connect, collaborate, and grow.
        </p>
        <button className="mt-6 bg-[#F83002] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition">
          Get Started Now
        </button>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose <span className="text-[#F83002]">Job Portal</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <FaBriefcase size={48} className="text-[#431692] mb-4" />
            <h3 className="text-xl font-semibold mb-2">For Recruiters</h3>
            <p className="text-gray-600">
              Post job openings, find top talent, and simplify your hiring
              process with ease.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <FaUserGraduate size={48} className="text-[#431692] mb-4" />
            <h3 className="text-xl font-semibold mb-2">For Students</h3>
            <p className="text-gray-600">
              Explore job opportunities, connect with recruiters, and kickstart
              your career.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <FaHandshake size={48} className="text-[#431692] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Networking</h3>
            <p className="text-gray-600">
              Build meaningful connections and foster professional growth in
              your field.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-16 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-gray-100 rounded-lg shadow-lg p-6 text-center">
            <p className="text-gray-600 italic mb-4">
              "This platform helped me find my first job in just two weeks!
              Highly recommended."
            </p>
            <h3 className="text-lg font-semibold">- John Doe, Student</h3>
          </div>
          {/* Testimonial 2 */}
          <div className="bg-gray-100 rounded-lg shadow-lg p-6 text-center">
            <p className="text-gray-600 italic mb-4">
              "We've hired exceptional candidates through this platform. The
              process is seamless."
            </p>
            <h3 className="text-lg font-semibold">- Jane Smith, Recruiter</h3>
          </div>
          {/* Testimonial 3 */}
          <div className="bg-gray-100 rounded-lg shadow-lg p-6 text-center">
            <p className="text-gray-600 italic mb-4">
              "A game-changer for job seekers and recruiters alike. Easy to use
              and very effective."
            </p>
            <h3 className="text-lg font-semibold">- Alice Brown, HR Manager</h3>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-[#431692] text-white py-12 px-6 md:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Join the Job Portal?
        </h2>
        <p className="text-lg mb-6">
          Sign up now and start exploring endless career opportunities.
        </p>
        <button className="bg-[#F83002] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition">
          Sign Up Today
        </button>
      </div>
    </div>
  );
};

export default HomePageSection;
