import { MapPin, DollarSign, Building2 } from "lucide-react";

const jobs = [
  { title: "Frontend Developer", company: "Tech Corp", location: "Remote", salary: "$50k – $70k", tag: "Full-time" },
  { title: "Marketing Manager", company: "Creative Studio", location: "New York, NY", salary: "$60k – $90k", tag: "Full-time" },
  { title: "UI/UX Designer", company: "Designify", location: "San Francisco, CA", salary: "$70k – $100k", tag: "Contract" },
  { title: "Customer Support", company: "HelpDesk Co.", location: "Austin, TX", salary: "$40k – $50k", tag: "Part-time" },
];

const tagColors = {
  "Full-time": "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400",
  "Contract": "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400",
  "Part-time": "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400",
};

const FeaturedJobsSection = () => {
  return (
    <div className="py-16 px-6 md:px-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        Featured{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Jobs
        </span>
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto">
        Hand-picked opportunities from top companies hiring right now.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {jobs.map((job) => (
          <div
            key={job.title}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-700 transition-all"
          >
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${tagColors[job.tag]}`}>
              {job.tag}
            </span>
            <h3 className="text-lg font-semibold mt-3 mb-1 text-gray-900 dark:text-white">{job.title}</h3>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-1">
              <Building2 size={14} />
              {job.company}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-1">
              <MapPin size={14} />
              {job.location}
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-2">
              <DollarSign size={14} />
              {job.salary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobsSection;
