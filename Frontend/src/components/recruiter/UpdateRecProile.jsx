import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, User, Phone } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant";
import { setAuthUser } from "../../redux/authSlice";
import apiRequest from "../../utils/axiosUtility";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const labelCls = "text-sm font-medium text-gray-700 dark:text-gray-300";

function UpdateRecProfile({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { authUser, token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: authUser?.fullname || "",
    number: authUser?.phoneNumber || "",
    profilePhoto: null,
  });

  const changeEventHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const profilePhotoChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds 10 MB.");
      e.target.value = null;
    } else {
      setInput({ ...input, profilePhoto: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.name);
    formData.append("phoneNumber", input.number);
    if (input.profilePhoto) formData.append("profilePhoto", input.profilePhoto);
    try {
      setLoading(true);
      const res = await apiRequest("PUT", `${USER_API_END_POINT}/profile/update`, formData, token, dispatch);
      dispatch(setAuthUser(res.data.data));
      toast.success(res.data.message);
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setInput({ name: authUser?.fullname || "", number: authUser?.phoneNumber || "", profilePhoto: null });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[460px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl"
        onInteractOutside={handleClose}
      >
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white text-lg font-bold">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2 pb-4">
          <div className="grid items-center grid-cols-4 gap-3">
            <label htmlFor="name" className={labelCls}>Name</label>
            <div className="col-span-3 relative">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" name="name" id="name" value={input.name} onChange={changeEventHandler} placeholder="Your full name"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          <div className="grid items-center grid-cols-4 gap-3">
            <label htmlFor="number" className={labelCls}>Number</label>
            <div className="col-span-3 relative">
              <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" name="number" id="number" value={input.number} onChange={changeEventHandler} placeholder="10-digit phone number"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          <div className="grid items-center grid-cols-4 gap-3">
            <label htmlFor="profilePhoto" className={labelCls}>Photo</label>
            <input type="file" name="profilePhoto" id="profilePhoto" onChange={profilePhotoChangeHandler} accept="image/*"
              className="col-span-3 text-sm text-gray-600 dark:text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 dark:file:bg-indigo-900/40 file:text-indigo-600 dark:file:text-indigo-400 hover:file:bg-indigo-100 transition cursor-pointer"
            />
          </div>

          <div className="pt-2">
            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 text-sm"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Profile"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateRecProfile;
