import { Users, Briefcase, FileText } from "lucide-react";
import { useSelector } from "react-redux";
import "../../CSS/Dashboard.css";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import useGetAllApplications from "../../hooks/useGetAllApplications";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import useGetAllfeedbacks from "../../hooks/useGetAllFeedBAck";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from "recharts";

// Group items by month
const groupByMonth = (items, dateField = "createdAt") => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const counts = {};
  (items || []).forEach((item) => {
    const d = new Date(item[dateField]);
    const key = `${months[d.getMonth()]} ${d.getFullYear()}`;
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts).map(([month, count]) => ({ month, count })).slice(-6);
};

const Dashboard = () => {
  useGetAllCompanies();
  useGetAllUsers();
  useGetAllApplications();
  useGetAllJobs();
  useGetAllfeedbacks();

  const { allCompanies } = useSelector((store) => store.company);
  const { allUsers } = useSelector((store) => store.auth);
  const { allApplications } = useSelector((store) => store.application);
  const { allJobs } = useSelector((store) => store.job);

  const userGrowthData = groupByMonth(allUsers);
  const jobGrowthData = groupByMonth(allJobs);

  // Merge for combined chart
  const combinedData = userGrowthData.map((u) => ({
    month: u.month,
    Users: u.count,
    Jobs: jobGrowthData.find((j) => j.month === u.month)?.count || 0,
  }));

  const stats = [
    { label: "Total Companies", value: allCompanies?.length || 0, icon: Briefcase, color: "bg-blue-50 text-blue-600" },
    { label: "Active Listings", value: allJobs?.length || 0, icon: FileText, color: "bg-purple-50 text-purple-600" },
    { label: "Total Applications", value: allApplications?.length || 0, icon: FileText, color: "bg-yellow-50 text-yellow-600" },
    { label: "Total Users", value: allUsers?.length || 0, icon: Users, color: "bg-green-50 text-green-600" },
  ];

  return (
    <div className="md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">View key metrics and insights for your platform.</p>
      </header>

      {/* Stats Cards */}
      <div className="dashres">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Growth */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">User Registrations (Last 6 Months)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Jobs Posted */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Jobs Posted (Last 6 Months)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={jobGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Jobs" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Combined Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Users vs Jobs Growth Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Users" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Jobs" stroke="#7c3aed" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Job Portal Admin. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
