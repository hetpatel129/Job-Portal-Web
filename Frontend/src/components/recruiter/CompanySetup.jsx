import { ArrowLeft, Loader2, Trash2, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetSingleCompany from "../../hooks/useGetSingleCompany";
import { toast } from "sonner";
import apiRequest from "../../utils/axiosUtility";
import { COMPANY_API_END_POINT } from "../../utils/constant";

const inputCls = "w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition";
const labelCls = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

function CompanySetup() {
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companyId = params.id;

  useGetSingleCompany(companyId);
  const { singleCompany } = useSelector((state) => state.company);
  const { token } = useSelector((store) => store.auth);

  const [input, setInput] = useState({ name: "", description: "", website: "", location: "", file: null });

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
  const changeFileHandler = (e) => { const f = e.target.files?.[0]; if (f) setInput({ ...input, file: f }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("website", input.website);
    formData.append("description", input.description);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await apiRequest("PUT", `${COMPANY_API_END_POINT}/updateCompany/${companyId}`, formData, token, dispatch);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/rec/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async () => {
    try {
      setLoading(true);
      await apiRequest("DELETE", `${COMPANY_API_END_POINT}/deleteCompany/${companyId}`, {}, token, dispatch);
      toast.success("Company deleted successfully");
      navigate("/rec/companies");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete company.");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition">
              <ArrowLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                <Building2 size={16} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">Edit Company</h1>
                <p className="text-xs text-gray-400 dark:text-gray-500">{singleCompany?.name}</p>
              </div>
            </div>
          </div>

          <button onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition">
            <Trash2 size={14} /> Delete
          </button>
        </div>

        {/* Form card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Company Name</label>
                <input type="text" name="name" value={input.name} onChange={changeEventHandler} required className={inputCls} placeholder="e.g. Acme Corp" />
              </div>
              <div>
                <label className={labelCls}>Location</label>
                <input type="text" name="location" value={input.location} onChange={changeEventHandler} className={inputCls} placeholder="e.g. New York, USA" />
              </div>
              <div>
                <label className={labelCls}>Website</label>
                <input type="text" name="website" value={input.website} onChange={changeEventHandler} className={inputCls} placeholder="https://example.com" />
              </div>
              <div>
                <label className={labelCls}>Logo</label>
                <input type="file" accept="image/*" onChange={changeFileHandler}
                  className="w-full text-sm text-gray-600 dark:text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 dark:file:bg-indigo-900/40 file:text-indigo-600 dark:file:text-indigo-400 hover:file:bg-indigo-100 transition cursor-pointer"
                />
                {singleCompany?.logo && !input.file && (
                  <img src={singleCompany.logo} alt="logo" className="mt-2 w-12 h-12 rounded-lg object-contain border border-gray-100 dark:border-gray-800" />
                )}
              </div>
            </div>

            <div>
              <label className={labelCls}>Description</label>
              <textarea name="description" value={input.description} onChange={changeEventHandler} rows={3}
                className={`${inputCls} resize-none`} placeholder="Tell candidates about your company..." />
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 text-sm">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
            </button>
          </form>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl p-6 max-w-sm w-full space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Trash2 size={18} className="text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Delete Company</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">This cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This will permanently delete <span className="font-semibold text-gray-900 dark:text-white">{singleCompany?.name}</span> along with all its jobs and applications.
            </p>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                Cancel
              </button>
              <button onClick={deleteCompany} disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanySetup;
