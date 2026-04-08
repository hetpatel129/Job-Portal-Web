import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "This platform helped me find my first job in just two weeks! Highly recommended.",
    name: "John Doe",
    role: "Student",
    initials: "JD",
    color: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400",
  },
  {
    quote: "We've hired exceptional candidates through this platform. The process is seamless.",
    name: "Jane Smith",
    role: "Recruiter",
    initials: "JS",
    color: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400",
  },
  {
    quote: "A game-changer for job seekers and recruiters alike. Easy to use and very effective.",
    name: "Alice Brown",
    role: "HR Manager",
    initials: "AB",
    color: "bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400",
  },
];

const TestimonialsSection = () => {
  return (
    <div className="py-16 px-6 md:px-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        What Our Users Say
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto">
        Real stories from students and recruiters who found success here.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <Quote size={28} className="text-indigo-300 dark:text-indigo-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-300 italic mb-6 leading-relaxed">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${t.color}`}>
                {t.initials}
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
