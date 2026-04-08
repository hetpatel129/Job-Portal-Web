import { useDispatch, useSelector } from "react-redux";
import { Trash2, Download } from "lucide-react";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import apiRequest from "../../utils/axiosUtility";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import useGetAllApplications from "../../hooks/useGetAllApplications";

const STATUS_STYLES = {
  pending:  "bg-yellow-100 text-yellow-700",
  reviewed: "bg-blue-100 text-blue-700",
  interview:"bg-purple-100 text-purple-700",
  offer:    "bg-emerald-100 text-emerald-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const ApplicationAdmin = () => {
  useGetAllApplications();
  const { allApplications } = useSelector((store) => store.application);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [apps, setApps] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => { setApps(allApplications || []); }, [allApplications]);

  const handleDelete = async (id) => {
    try {
      await apiRequest("DELETE", `${APPLICATION_API_END_POINT}/deleteApplicant/${id}`, {}, token, dispatch);
      setApps((prev) => prev.filter((a) => a._id !== id));
      toast.success("Application deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const exportCSV = () => {
    const headers = ["Applicant", "Email", "Job", "Company", "Status", "Applied On"];
    const rows = filtered.map((a) => [
      a.applicant?.fullname,
      a.applicant?.email,
      a.job?.title,
      a.job?.company?.name || "N/A",
      a.status,
      new Date(a.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "applications.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const filtered = apps.filter((a) => {
    const matchSearch =
      a.applicant?.fullname?.toLowerCase().includes(search.toLowerCase()) ||
      a.applicant?.email?.toLowerCase().includes(search.toLowerCase()) ||
      a.job?.title?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Application Management</h1>
        <button onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 rounded-lg text-sm hover:bg-green-600 hover:text-white transition">
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or job..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm focus:outline-none">
          {["all","pending","reviewed","interview","offer","accepted","rejected"].map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
            <tr>
              {["Applicant", "Email", "Phone", "Job", "Company", "Status", "Applied On", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filtered.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-10 text-gray-400">No applications found.</td></tr>
            ) : filtered.map((a) => (
              <tr key={a._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {a.applicant?.profile?.profilePhoto ? (
                      <img src={a.applicant.profile.profilePhoto} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        {a.applicant?.fullname?.charAt(0)}
                      </div>
                    )}
                    {a.applicant?.fullname}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{a.applicant?.email}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{a.applicant?.phoneNumber}</td>
                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">{a.job?.title || "N/A"}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{a.job?.company?.name || "N/A"}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[a.status] || "bg-gray-100 text-gray-600"}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {new Date(a.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(a._id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 text-xs text-gray-400 border-t dark:border-gray-700">
          Showing {filtered.length} of {apps.length} applications
        </div>
      </div>
    </div>
  );
};

export default ApplicationAdmin;
