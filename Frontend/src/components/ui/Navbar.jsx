import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { LogOut, User2, Sun, Moon, Menu, X, Briefcase, Home, Search, Building2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logOutHandler } from "../../utils/logoutHandler";
import { useTheme } from "../../context/ThemeContext";

export const Navbar = () => {
  const { authUser, token } = useSelector((store) => store.auth);
  const role = authUser?.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    try {
      logOutHandler(dispatch, navigate, token);
      setIsPopoverOpen(false);
      setMobileOpen(false);
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleLogo = () => {
    setMobileOpen(false);
    if (role === "recruiter") navigate("/recHome");
    else if (role === "student") navigate("/studenthome");
    else if (role === "admin") navigate("/AdminHomepage");
    else navigate("/");
  };

  const viewProfileHandler = () => {
    setIsPopoverOpen(false);
    setMobileOpen(false);
    if (role === "student") navigate("/profile");
    else if (role === "recruiter") navigate("/recProfile");
    else if (role === "admin") navigate("/admin/profile");
  };

  const studentLinks = [
    { to: "/studentHome", label: "Home",   icon: Home },
    { to: "/jobs",        label: "Jobs",   icon: Briefcase },
    { to: "/browse",      label: "Browse", icon: Search },
  ];

  const recruiterLinks = [
    { to: "/rec/companies", label: "Company", icon: Building2 },
    { to: "/rec/jobs",      label: "Jobs",    icon: Briefcase },
  ];

  const navLinks = role === "student" ? studentLinks : role === "recruiter" ? recruiterLinks : [];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <button onClick={handleLogo} className="flex items-center gap-1 flex-shrink-0">
              <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
                Job
              </span>
              <span className="text-2xl font-extrabold text-red-500 tracking-tight">
                Portal
              </span>
            </button>

            {/* ── Desktop nav links ── */}
            {navLinks.length > 0 && (
              <ul className="hidden md:flex items-center gap-1">
                {navLinks.map(({ to, label, icon: Icon }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
                    >
                      <Icon size={15} />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* ── Right side ── */}
            <div className="flex items-center gap-2">
              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                title={isDark ? "Switch to Light" : "Switch to Dark"}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {authUser ? (
                <>
                  {/* Mobile hamburger */}
                  {navLinks.length > 0 && (
                    <button
                      className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      onClick={() => setMobileOpen(!mobileOpen)}
                    >
                      {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                  )}

                  {/* Avatar popover */}
                  <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button className="ml-1 flex-shrink-0">
                        {authUser?.profile?.profilePhoto ? (
                          <img
                            src={authUser.profile.profilePhoto}
                            alt={authUser?.fullname}
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-400 dark:ring-indigo-600"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm ring-2 ring-indigo-400">
                            {authUser?.fullname?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-0 mt-2 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
                      {/* Profile header */}
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
                        {authUser?.profile?.profilePhoto ? (
                          <img src={authUser.profile.profilePhoto} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-400" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                            {authUser?.fullname?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 dark:text-white truncate">{authUser?.fullname}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{authUser?.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 capitalize">
                            {authUser?.role}
                          </span>
                        </div>
                      </div>
                      <div className="p-2">
                        <button onClick={viewProfileHandler}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                          <User2 size={16} className="text-indigo-500" />
                          View Profile
                        </button>
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition mt-1">
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </>
              ) : (
                <div className="flex items-center gap-2 ml-1">
                  <Link to="/login"
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition">
                    Login
                  </Link>
                  <Link to="/signup"
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition shadow-sm">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Mobile dropdown menu ── */}
        {mobileOpen && navLinks.length > 0 && (
          <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 space-y-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};
