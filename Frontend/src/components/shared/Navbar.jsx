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
      <Link to="/admin/companies" onClick={() => setIsMenuOpen(false)} className="relative text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20">Companies</Link>
      <Link to="/admin/jobs" onClick={() => setIsMenuOpen(false)} className="relative text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20">Jobs</Link>
    </>
  ) : role === "student" ? (
    <>
      <Link to="/" onClick={() => setIsMenuOpen(false)} className="relative text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20">Home</Link>
      <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className="relative text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20">Jobs</Link>
      <Link to="/browse" onClick={() => setIsMenuOpen(false)} className="relative text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20">Browse</Link>
    </>
  ) : null;

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button onClick={handleLogo} className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">JobPortal</span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {authUser ? (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Avatar className="w-8 h-8 ring-2 ring-indigo-100 dark:ring-indigo-900">
                      <AvatarImage src={authUser?.profile?.profilePhoto || ""} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-semibold">
                        {authUser?.fullname?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">{authUser?.fullname?.split(' ')[0]}</span>
                    <svg className="hidden sm:block w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl rounded-xl overflow-hidden" align="end">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 text-white">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 ring-2 ring-white/30">
                        <AvatarImage src={authUser?.profile?.profilePhoto || ""} />
                        <AvatarFallback className="bg-white/20 text-white font-bold">
                          {authUser?.fullname?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm truncate">{authUser?.fullname}</h3>
                        <p className="text-xs text-indigo-100 truncate">{authUser?.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    {role === "student" && (
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                          <User2 size={16} className="text-gray-400" />
                          <span>View Profile</span>
                        </button>
                      </Link>
                    )}
                    {role === "recruiter" && (
                      <Link to="/recProfile" onClick={() => setIsMenuOpen(false)}>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                          <User2 size={16} className="text-gray-400" />
                          <span>View Profile</span>
                        </button>
                      </Link>
                    )}
                    {role === "admin" && (
                      <Link to="/admin/profile" onClick={() => setIsMenuOpen(false)}>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                          <User2 size={16} className="text-gray-400" />
                          <span>View Profile</span>
                        </button>
                      </Link>
                    )}
                    <button onClick={logOutHandler} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors mt-1">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks}
            {!authUser && (
              <div className="flex flex-col gap-2 pt-3 border-t border-gray-200 dark:border-gray-800 mt-3">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
