import { Mail } from "lucide-react";

const NewsletterSection = () => {
  return (
    <div className="py-16 px-6 md:px-16 bg-white dark:bg-gray-900">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-10 text-center text-white shadow-xl">
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Mail size={28} />
        </div>
        <h2 className="text-3xl font-bold mb-3">Stay Updated</h2>
        <p className="text-indigo-100 mb-8">
          Subscribe to our newsletter for the latest job updates and career tips.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-3 rounded-xl text-gray-800 bg-white w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSection;
