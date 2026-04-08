import { writeFileSync } from "fs";

const content = `import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Calendar, Download, MapPin, FileText, Phone, Mail, Trash2, X, CheckCircle } from "lucide-react";
import apiRequest from "../../utils/axiosUtility";
import { APPLICATION_API_END_POINT } from "../../utils/constant";

const STATUS_STYLES = {
  accepted:  "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400",
  offer:     "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400",
  interview: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400",
  reviewed:  "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400",
  pending:   "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300",
  rejected:  "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400",
};

const STATUS_ACTIONS = [
  { key: "reviewed", label: "Reviewed", color: "border-blue-300 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20" },
  { key: "offer",    label: "Offer",    color: "border-emerald-300 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20" },
  { key: "accepted", label: "Accept",   color: "border-green-300 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20" },
  { key: "rejected", label: "Reject",   color: "border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" },
];

function Applicantstable() {
  const { applicants } = useSelector((store) => store.application);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [localApplicants, setLocalApplicants] = useState(applicants);
  const [deleteId, setDeleteId] = useState(null);
  const [interviewModal, setInterviewModal] = useState({ open: false, id: null });
  const [interviewForm, setInterviewForm] = useState({ interviewDate: "", interviewNote: "", interviewPlace: "" });

  useEffect(() => { setLocalApplicants(applicants); }, [applicants]);

  const formatDate = (iso) => new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  const formatDateTime = (iso) => new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const statusHandler = async (status, id) => {
    try {
      await apiRequest("PUT", APPLICATION_API_END_POINT + "/updateStatus/" + id, { status }, token, dispatch);
      toast.success("Marked as " + status);
      setLocalApplicants((prev) => prev.map((a) => a._id === id ? { ...a, status } : a));
    } catch (err) { toast.error(err.message); }
  };

  const scheduleInterview = async () => {
    if (!interviewForm.interviewDate) return toast.error("Please select an interview date");
    try {
      await apiRequest("PUT", APPLICATION_API_END_POINT + "/scheduleInterview/" + interviewModal.id, interviewForm, token, dispatch);
      toast.success("Interview scheduled and email sent!");
      setLocalApplicants((prev) => prev.map((a) => a._id === interviewModal.id ? { ...a, status: "interview", ...interviewForm } : a));
      setInterviewModal({ open: false, id: null });
      setInterviewForm({ interviewDate: "", interviewNote: "", interviewPlace: "" });
    } catch { toast.error("Failed to schedule interview"); }
  };

  const deleteApplicant = async () => {
    try {
      await apiRequest("DELETE", APPLICATION_API_END_POINT + "/deleteApplicant/" + deleteId, {}, token, dispatch);
      toast.success("Applicant removed");
      setLocalApplicants((prev) => prev.filter((a) => a._id !== deleteId));
    } catch (err) { toast.error(err.message); }
    finally { setDeleteId(null); }
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Status", "Applied On", "Interview Date"];
    const rows = localApplicants.map((a) => [a.applicant.fullname, a.applicant.email, a.applicant.phoneNumber, a.status, formatDate(a.createdAt), a.interviewDate ? formatDate(a.interviewDate) : "N/A"]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = "applicants.csv"; link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {localApplicants?.length > 0 && (
        <div className="flex justify-end mb-5">
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-green-300 text-green-600 dark:text-green-400 dark:border-green-700 text-sm font-medium hover:bg-green-50 dark:hover:bg-green-900/20 transition bg-white dark:bg-gray-800">
            <Download size={15} /> Export CSV
          </button>
        </div>
      )}

      {!localApplicants?.length ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mb-4">
            <FileText size={28} className="text-indigo-500" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 font-semibold">No applicants yet</p>
          <p className="text-gray-400 text-sm mt-1">Applicants will appear here once they apply.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {localApplicants.map((a) => (
            <div key={a._id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5 flex items-start gap-4">
                {a.applicant.profile?.profilePhoto ? (
                  <img src={a.applicant.profile.profilePhoto} alt="avatar" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {a.applicant.fullname?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">{a.applicant.fullname}</h3>
                    <span className={"text-xs font-medium px-2.5 py-1 rounded-full capitalize flex-shrink-0 " + (STATUS_STYLES[a.status] || STATUS_STYLES.pending)}>{a.status}</span>
                  </div>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 truncate"><Mail size={11} /> {a.applicant.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5"><Phone size={11} /> {a.applicant.phoneNumber}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Applied: {formatDate(a.createdAt)}</p>
                  </div>
                </div>
              </div>

              {a.interviewDate && (
                <div className="mx-5 mb-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 border border-purple-100 dark:border-purple-800">
                  <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 flex items-center gap-1.5 mb-1"><Calendar size={12} /> {formatDateTime(a.interviewDate)}</p>
                  {a.interviewPlace && <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1.5"><MapPin size={11} /> {a.interviewPlace}</p>}
                  {a.interviewNote && <p className="text-xs text-purple-500 dark:text-purple-400 mt-1 italic">{a.interviewNote}</p>}
                </div>
              )}

              <div className="px-5 mb-3">
                {a.applicant.profile?.resume ? (
                  <a href={import.meta.env.VITE_BASEURI + "user/resume/view?url=" + encodeURIComponent(a.applicant.profile.resume)} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                    <FileText size={12} /> {a.applicant.profile.resumeOrignalName || "View Resume"}
                  </a>
                ) : <p className="text-xs text-gray-400">No resume uploaded</p>}
              </div>

              <div className="px-5 pb-5 mt-auto">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {STATUS_ACTIONS.map((s) => (
                    <button key={s.key} onClick={() => statusHandler(s.key, a._id)} className={"border px-2.5 py-1 rounded-lg text-xs font-medium transition-colors " + s.color}>{s.label}</button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setInterviewModal({ open: true, id: a._id })} className="flex-1 flex items-center justify-center gap-1.5 border border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 px-3 py-1.5 rounded-xl text-xs font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition">
                    <Calendar size={12} /> Schedule
                  </button>
                  <button onClick={() => setDeleteId(a._id)} className="flex items-center justify-center gap-1.5 border border-red-300 dark:border-red-700 text-red-500 dark:text-red-400 px-3 py-1.5 rounded-xl text-xs font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {interviewModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"><Calendar size={18} className="text-purple-500" /> Schedule Interview</h2>
              <button onClick={() => setInterviewModal({ open: false, id: null })} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"><X size={16} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Date and Time</label>
                <input type="datetime-local" value={interviewForm.interviewDate} onChange={(e) => setInterviewForm({ ...interviewForm, interviewDate: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Location / Place</label>
                <input type="text" value={interviewForm.interviewPlace} onChange={(e) => setInterviewForm({ ...interviewForm, interviewPlace: e.target.value })}
                  placeholder="e.g. Office Room 3, Google Meet link..."
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Note (optional)</label>
                <textarea value={interviewForm.interviewNote} onChange={(e) => setInterviewForm({ ...interviewForm, interviewNote: e.target.value })}
                  placeholder="e.g. Bring portfolio, dress formally..." rows={3}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setInterviewModal({ open: false, id: null })} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">Cancel</button>
              <button onClick={scheduleInterview} className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition">
                <CheckCircle size={15} /> Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center mx-auto mb-4"><Trash2 size={24} className="text-red-500" /></div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Remove Applicant?</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">Cancel</button>
              <button onClick={deleteApplicant} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Applicantstable;
`;

writeFileSync("Frontend/src/components/recruiter/Applicantstable.jsx", content, "utf8");
console.log("Done");
