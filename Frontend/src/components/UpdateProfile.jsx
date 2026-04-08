import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constant";
import { setAuthUser } from "../redux/authSlice";
import { toast } from "sonner";
import apiRequest from "../utils/axiosUtility";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const inputCls =
  "col-span-3 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition";

const labelCls = "text-sm font-medium text-gray-700 dark:text-gray-300";

function UpdateProfile({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { authUser, token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: authUser?.fullname || "",
    number: authUser?.phoneNumber || "",
    bio: authUser?.profile?.bio || "",
    skills: authUser?.profile?.skills || "",
    file: null,
    profilePhoto: null,
  });

  const changeEventHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds 10 MB.");
      e.target.value = null;
    } else {
      setInput({ ...input, file });
    }
  };

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
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) formData.append("file", input.file);
    if (input.profilePhoto) formData.append("profilePhoto", input.profilePhoto);

    try {
      setLoading(true);
      const res = await apiRequest("PUT", `${USER_API_END_POINT}/profile/update`, formData, token, dispatch);
      dispatch(setAuthUser(res.data.data));
      toast.success(res.data.message);
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setInput({
      name: authUser?.fullname || "",
      number: authUser?.phoneNumber || "",
      bio: authUser?.profile?.bio || "",
      skills: authUser?.profile?.skills || "",
      file: null,
      profilePhoto: null,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[520px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl"
        onInteractOutside={handleClose}
      >
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white text-lg font-bold">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-3">
              <label htmlFor="name" className={labelCls}>Name</label>
              <input type="text" name="name" id="name" value={input.name} onChange={changeEventHandler} placeholder="Your full name" className={inputCls} />
            </div>
            <div className="grid items-center grid-cols-4 gap-3">
              <label htmlFor="number" className={labelCls}>Number</label>
              <input type="text" name="number" id="number" value={input.number} onChange={changeEventHandler} placeholder="10-digit phone number" className={inputCls} />
            </div>
            <div className="grid items-center grid-cols-4 gap-3">
              <label htmlFor="bio" className={labelCls}>Bio</label>
              <textarea name="bio" id="bio" value={input.bio} onChange={changeEventHandler} placeholder="Tell us about yourself" rows={2} className={`${inputCls} resize-none`} />
            </div>
            <div className="grid items-center grid-cols-4 gap-3">
              <label htmlFor="skills" className={labelCls}>Skills</label>
              <div className="col-span-3">
                <input type="text" name="skills" id="skills" value={input.skills} onChange={changeEventHandler} placeholder="JavaScript, React, Node.js"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Separate with commas e.g., JavaScript, React</p>
              </div>
            </div>
            <div className="grid items-center grid-cols-4 gap-3">
              <label htmlFor="file" className={labelCls}>Resume</label>
              <input type="file" name="file" id="file" onChange={fileChangeHandler} accept="application/pdf"
                className="col-span-3 text-sm text-gray-600 dark:text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 dark:file:bg-indigo-900/40 file:text-indigo-600 dark:file:text-indigo-400 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/60 transition cursor-pointer"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-3">
              <label htmlFor="profilePhoto" className={labelCls}>Photo</label>
              <input type="file" name="profilePhoto" id="profilePhoto" onChange={profilePhotoChangeHandler} accept="image/*"
                className="col-span-3 text-sm text-gray-600 dark:text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 dark:file:bg-indigo-900/40 file:text-indigo-600 dark:file:text-indigo-400 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/60 transition cursor-pointer"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl transition"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProfile;
