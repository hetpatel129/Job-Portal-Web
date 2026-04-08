import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Building2, Loader2 } from "lucide-react";
import apiRequest from "../../utils/axiosUtility";
import { COMPANY_API_END_POINT } from "../../utils/constant";

function CreateCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);

  const registerNewCompany = async (e) => {
    e.preventDefault();
    if (!companyName.trim()) {
      toast.error("Company name cannot be empty.");
      return;
    }
    try {
      setLoading(true);
      const res = await apiRequest("POST", `${COMPANY_API_END_POINT}/registerCompany`, { companyName }, token, dispatch);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/rec/companies/${res.data.data._id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-lg mx-auto px-4 py-10">

        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate("/rec/companies")}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition">
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
              <Building2 size={16} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">New Company</h1>
              <p className="text-xs text-gray-400 dark:text-gray-500">Register a new company</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <form onSubmit={registerNewCompany} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Corp, Microsoft..."
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">
                You can update the logo, description, and other details on the next step.
              </p>
            </div>

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => navigate("/rec/companies")}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                Cancel
              </button>
              <button type="submit" disabled={loading || !companyName.trim()}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 text-sm disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
