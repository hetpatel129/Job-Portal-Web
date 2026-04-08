const AboutUs = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          Welcome to{" "}
          <span className="font-semibold text-blue-600">Job Portal</span>, your
          one-stop destination for finding the best job opportunities. Our
          mission is to connect talented professionals with leading companies,
          making the job search experience seamless and efficient.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600">
              We aim to bridge the gap between job seekers and recruiters by
              providing a user-friendly and efficient platform.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Why Choose Us?
            </h3>
            <p className="text-gray-600">
              We offer a vast range of job listings, real-time updates, and
              career guidance to help job seekers land their dream job.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Our Commitment
            </h3>
            <p className="text-gray-600">
              We are committed to providing a trustworthy platform with verified
              job postings and career resources.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Us</h3>
          <p className="text-gray-600 text-lg mb-6">
            Whether you&apos;re a job seeker or a recruiter, our platform is
            designed to help you succeed. Start your journey with us today!
          </p>
          <a
            href="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
