import { Briefcase, GraduationCap, Handshake } from "lucide-react";

const features = [
  {
    icon: Briefcase,
    color: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400",
    title: "For Recruiters",
    description: "Post job openings, find top talent, and simplify your hiring process with ease.",
  },
  {
    icon: GraduationCap,
    color: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400",
    title: "For Students",
    description: "Explore job opportunities, connect with recruiters, and kickstart your career.",
  },
  {
    icon: Handshake,
    color: "bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400",
    title: "Networking",
    description: "Build meaningful connections and foster professional growth in your field.",
  },
];

const FeaturesSection = () => {
  return (
    <div className="py-16 px-6 md:px-16 bg-white dark:bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        Why Choose{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Job Portal
        </span>
        ?
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto">
        Everything you need to connect the right people with the right opportunities.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${f.color}`}>
              <f.icon size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{f.title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
