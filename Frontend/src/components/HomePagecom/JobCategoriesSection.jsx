import { Code2, TrendingUp, Palette, Headphones, DollarSign, BookOpen } from "lucide-react";

const categories = [
  { title: "Software Development", jobs: "120+ Jobs", icon: Code2, color: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400" },
  { title: "Marketing & Sales", jobs: "80+ Jobs", icon: TrendingUp, color: "bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400" },
  { title: "Design & Creative", jobs: "50+ Jobs", icon: Palette, color: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400" },
  { title: "Customer Support", jobs: "40+ Jobs", icon: Headphones, color: "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400" },
  { title: "Finance", jobs: "30+ Jobs", icon: DollarSign, color: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400" },
  { title: "Education", jobs: "25+ Jobs", icon: BookOpen, color: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" },
];

const JobCategoriesSection = () => {
  return (
    <div className="py-16 px-6 md:px-16 bg-white dark:bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        Explore{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Job Categories
        </span>
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto">
        Find opportunities across a wide range of industries and roles.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700 transition-all cursor-pointer group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${cat.color}`}>
              <cat.icon size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{cat.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{cat.jobs}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategoriesSection;
