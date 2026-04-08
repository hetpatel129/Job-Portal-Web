const steps = [
  { step: 1, title: "Sign Up", description: "Create an account as a student or recruiter to get started.", color: "from-indigo-500 to-indigo-600" },
  { step: 2, title: "Post or Apply", description: "Recruiters post jobs; students browse and apply with one click.", color: "from-purple-500 to-purple-600" },
  { step: 3, title: "Get Connected", description: "Match with the right people and grow your career or team.", color: "from-pink-500 to-pink-600" },
];

const HowItWorksSection = () => {
  return (
    <div className="py-16 px-6 md:px-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        How It Works
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto">
        Three simple steps to land your next opportunity or hire your next star.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <div key={s.step} className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
            {/* connector line */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-10 left-full w-8 h-0.5 bg-indigo-200 dark:bg-indigo-700 z-10" />
            )}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center text-xl font-bold mx-auto mb-5 shadow-md`}>
              {s.step}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{s.title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSection;
