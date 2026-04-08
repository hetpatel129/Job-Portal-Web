import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I apply for jobs?",
    answer: "Sign up for an account, create a complete profile with your skills and experience, and browse job listings. Use filters to narrow your search and apply directly with one click.",
  },
  {
    question: "Is this platform free?",
    answer: "Yes, the platform is free for job seekers. You can explore jobs, apply to multiple opportunities, and manage your applications without any charges.",
  },
  {
    question: "How do I contact recruiters?",
    answer: "Once you have applied to a job, recruiters can contact you directly. Additionally, you may receive messages from recruiters if your profile matches their requirements.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="py-16 px-6 md:px-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        Frequently Asked{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Questions
        </span>
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto">
        Got questions? We have answers.
      </p>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center p-6 text-left"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white pr-4">
                {faq.question}
              </h3>
              <ChevronDown
                size={20}
                className={`flex-shrink-0 text-indigo-500 transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`}
              />
            </button>
            {activeIndex === index && (
              <div className="px-6 pb-6 text-gray-500 dark:text-gray-400 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
