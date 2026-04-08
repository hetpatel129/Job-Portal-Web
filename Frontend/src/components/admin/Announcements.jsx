import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Trash2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiRequest from "../../utils/axiosUtility";
import { ANNOUNCEMENT_API_END_POINT } from "../../utils/constant";
import { useDispatch } from "react-redux";

const Announcements = () => {
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", message: "", targetRole: "all" });

  const fetchAnnouncements = async () => {
    try {
      const res = await apiRequest("GET", ANNOUNCEMENT_API_END_POINT, {}, token, dispatch);
      setAnnouncements(res.data.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchAnnouncements(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.message) return toast.error("Title and message required");
    setLoading(true);
    try {
      await apiRequest("POST", `${ANNOUNCEMENT_API_END_POINT}/create`, form, token, dispatch);
      toast.success("Announcement sent to all users via email!");
      setForm({ title: "", message: "", targetRole: "all" });
      fetchAnnouncements();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send announcement");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiRequest("DELETE", `${ANNOUNCEMENT_API_END_POINT}/${id}`, {}, token, dispatch);
      setAnnouncements((prev) => prev.filter((a) => a._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Send Announcement</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4 mb-8">
        <div>
          <Label>Title</Label>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Announcement title" className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <Label>Message</Label>
          <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Write your announcement..."
            className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4} />
        </div>
        <div>
          <Label>Target Audience</Label>
          <select value={form.targetRole} onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm">
            <option value="all">All Users</option>
            <option value="student">Students Only</option>
            <option value="recruiter">Recruiters Only</option>
          </select>
        </div>
        <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Send size={16} className="mr-2" />
          {loading ? "Sending..." : "Send Announcement"}
        </Button>
      </form>

      {/* Past Announcements */}
      <h2 className="text-xl font-semibold mb-4">Past Announcements</h2>
      {announcements.length === 0 ? (
        <p className="text-gray-500">No announcements yet.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((a) => (
            <div key={a._id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{a.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{a.message}</p>
                <div className="flex gap-3 mt-2 text-xs text-gray-400">
                  <span>To: <span className="capitalize font-medium text-gray-600 dark:text-gray-300">{a.targetRole}</span></span>
                  <span>{new Date(a.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <button onClick={() => handleDelete(a._id)} className="text-red-500 hover:text-red-700 ml-4">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
