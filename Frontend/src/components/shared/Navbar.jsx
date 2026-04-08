import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";
import { setAuthUser, setToken } from "../../redux/authSlice";
import {
  setAllJobs,
  setAllJobsAdmin,
  setSingleJob,
} from "../../redux/jobSlice";
import { setAllCompanies } from "../../redux/companySlice";
import apiRequest from "../../utils/axiosUtility";
import { useState } from "react";
import "../../CSS/Navbar.css";

export const Navbar = () => {
  const { authUser } = useSelector((store) => store.auth);
  const role = authUser?.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logOutHandler = async () => {
    try {
      const endpoint = `${USER_API_END_POINT}/logOut`;
      const res = await apiRequest("GET", endpoint, {}, token, dispatch);

      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSingleJob(null));
        dispatch(setAllJobs(null));
        dispatch(setAllCompanies(null));
        dispatch(setToken(""));
        dispatch(setAllJobsAdmin(null));
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogo = () => {
    if (authUser && authUser.role === "recruiter") {
      navigate("/admin/companies");
    } else {
      navigate("/");
    }
  };

  const navLinks = role === "recruiter" ? (
    <>
      <Link to="/admin/companies" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium hover:text-indigo-600 transition-colors px-2 py-1">Companies</Link>
      <Link to="/admin/jobs" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium hover:text-indigo-600 transition-colors px-2 py-1">Jobs</Link>
    </>
  ) : role === "student" ? (
    <>
      <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium hover:text-indigo-600 transition-colors px-2 py-1">Home</Link>
      <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium hover:text-indigo-600 transition-colors px-2 py-1">Jobs</Link>
      <Link to="/browse" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium hover:text-indigo-600 transition-colors px-2 py-1">Browse</Link>
    </>
  ) : null;

  return (
    <div className="bg-white shadow-sm mb-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-lg md:text-2xl font-bold cursor-pointer flex-shrink-0" onClick={handleLogo}>
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {authUser ? (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer w-9 h-9">
                  <AvatarImage src={authUser?.profile?.profilePhoto || ""} />
                  <AvatarFallback>{authUser?.fullname?.charAt(0)?.toUpperCase()}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 mt-2 bg-white">
                <div className="flex items-center gap-3 p-3 border-b">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={authUser?.profile?.profilePhoto || ""} />
                    <AvatarFallback>{authUser?.fullname?.charAt(0)?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h1 className="font-bold text-sm truncate">{authUser?.fullname}</h1>
                    <p className="text-xs text-gray-500 truncate">{authUser?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col p-2">
                  {role === "student" && (
                    <Link to="/profile"><Button variant="link" className="w-full justify-start"><User2 size={14} /> &nbsp; View Profile</Button></Link>
                  )}
                  {role === "recruiter" && (
                    <Link to="/recProfile"><Button variant="link" className="w-full justify-start"><User2 size={14} /> &nbsp; View Profile</Button></Link>
                  )}
                  {role === "admin" && (
                    <Link to="/admin/profile"><Button variant="link" className="w-full justify-start"><User2 size={14} /> &nbsp; View Profile</Button></Link>
                  )}
                  <Button variant="link" className="w-full justify-start text-red-500 hover:text-red-600" onClick={logOutHandler}>
                    <LogOut size={14} /> &nbsp; Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login"><Button variant="outline" size="sm">Login</Button></Link>
              <Link to="/signup"><Button size="sm" className="bg-[#20B2AA] text-white hover:bg-[#008080]">Signup</Button></Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-700 focus:outline-none p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 flex flex-col gap-2 shadow-md">
          {navLinks}
          {!authUser && (
            <div className="flex gap-2 mt-2">
              <Link to="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full" size="sm">Login</Button>
              </Link>
              <Link to="/signup" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="w-full bg-[#20B2AA] text-white hover:bg-[#008080]">Signup</Button>
              </Link>
            </div>
          )}
        </div>
      )}
      <hr />
    </div>
  );
};
