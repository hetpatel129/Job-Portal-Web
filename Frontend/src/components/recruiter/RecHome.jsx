import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FeedbackForm from "../FeedBackForm";
import { Building2, Briefcase, Users, TrendingUp, ArrowRight, CheckCircle2, Zap, Target, BarChart3 } from "lucide-react";

const HomeRecruiter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // No forced logout on load — ProtectedRoute handles auth

  const stats = [
    { icon: Briefcase,  value: "1,200+", label: "Jobs Posted",            color: "text-indigo-600 dark:text-indigo-400",  bg: "bg-indigo-50 dark:bg-indigo-900/40" },
    { icon: Users,      value: "800+",   label: "Candidates Hired",       color: "text-purple-600 dark:text-purple-400",  bg: "bg-purple-50 dark:bg-purple-900/40" },
    { icon: Building2,  value: "500+",   label: "Companies Registered",   color: "text-pink-600 dark:text-pink-400",      bg: "bg-pink-50 dark:bg-pink-900/40" },
    { icon: TrendingUp, value: "95%",    label: "Satisfaction Rate",      color: "text-green-600 dark:text-green-400",    bg: "bg-green-50 dark:bg-green-900/40" },
  ];

  const features = [
    { icon: Zap,        title: "Post in Minutes",      desc: "Create and publish job listings quickly with our streamlined posting flow." },
    { icon: Target,     title: "Targeted Reach",       desc: "Connect with qualified candidates who match your exact requirements." },
    { icon: BarChart3,  title: "Track Applications",   desc: "Manage all applicants in one place with real-time status updates." },
    { icon: CheckCircle2, title: "Smart Screening",    desc: "Review resumes, schedule interviews, and send offers seamlessly." },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center justify-center px-4 text-center
        bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50
        dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950">

        {/* Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-300/20 dark:bg-indigo-700/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 dark:bg-purple-700/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-7">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-medium border border-indigo-200 dark:border-indigo-700">
            ✨ Hiring made simple
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Find{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Top Talent
            </span>
            <br />in Minutes
          </h1>

          <p className="max-w-xl mx-auto text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Simplify your hiring process. Post jobs, review applications, and find the best candidates — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate("/rec/companies")}
              className="px-7 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl transition shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-2"
            >
              <Building2 size={17} /> Add Your Company
            </button>
            <button
              onClick={() => navigate("/rec/jobs")}
              className="px-7 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-2"
            >
              Post a Job <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map(({ icon: Icon, value, label, color, bg }) => (
            <div key={label} className="flex flex-col items-center text-center p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition">
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon size={22} className={color} />
              </div>
              <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-4 bg-gradient-to-b from-indigo-50/40 to-white dark:from-indigo-950/20 dark:to-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3">Why choose us</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Everything you need to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                hire faster
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 p-10 text-center text-white shadow-xl shadow-indigo-200 dark:shadow-none">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">Ready to find your next hire?</h2>
          <p className="text-indigo-200 mb-7 max-w-md mx-auto">Post your job opening now and attract top-tier talent tailored to your needs.</p>
          <button
            onClick={() => navigate("/rec/jobs")}
            className="px-8 py-3 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition shadow-md flex items-center gap-2 mx-auto"
          >
            <Briefcase size={17} /> Post a Job Now
          </button>
        </div>
      </section>

      <FeedbackForm />
    </div>
  );
};

export default HomeRecruiter;
