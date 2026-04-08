import { useState, useEffect } from "react";
import { Users, Briefcase, FileText, BarChart3, Menu, X, Factory, MessageSquare, Bell } from "lucide-react";
import Dashboard from "./Dashboard";
import JobAdmin from "./JobAdmin";
import Applicationadmin from "./Applicationadmin";
import UserAdmin from "./UserAdmin";
import CompaniesAdmin from "./CompaniesAdmin";
import { FeedbackAdmin } from "./FeedbackAdmin.jsx";
import Announcements from "./Announcements.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { logOutHandler } from "../../utils/logoutHandler.js";

const navItems = [
  { icon: BarChart3,    label: "Dashboard",    id: "dashboard" },
  { icon: Briefcase,    label: "Jobs",         id: "jobs" },
  { icon: FileText,     label: "Applications", id: "applications" },
  { icon: Users,        label: "Users",        id: "users" },
  { icon: Factory,      label: "Companies",    id: "company" },
  { icon: MessageSquare,label: "Feedback",     id: "feedback" },
  { icon: Bell,         label: "Announcements",id: "announcements" },
];

const tabs = {
  dashboard:    <Dashboard />,
  jobs:         <JobAdmin />,
  applications: <Applicationadmin />,
  users:        <UserAdmin />,
  company:      <CompaniesAdmin />,
  feedback:     <FeedbackAdmin />,
  announcements:<Announcements />,
};

function AdminHomepage() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.auth);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token && !authUser) {
      navigate("/adminLogin");
    }
  }, []);

  const handleNav = (id) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <nav className="flex flex-col gap-1 p-3 flex-1">
      {navItems.map(({ icon: Icon, label, id }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => handleNav(id)}
            title={collapsed ? label : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full
              ${active
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              }`}
          >
            <Icon size={17} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      {/* ── Desktop sidebar ── */}
      <aside className={`hidden md:flex flex-col flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 ${collapsed ? "w-16" : "w-56"}`}>
        {/* Sidebar header */}
        <div className={`flex items-center h-16 px-3 border-b border-gray-100 dark:border-gray-800 ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && (
            <span className="text-sm font-bold text-gray-900 dark:text-white">Admin Panel</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-200 transition"
          >
            {collapsed ? <Menu size={18} /> : <X size={18} />}
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* ── Mobile sidebar drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-56 bg-white dark:bg-gray-900 flex flex-col shadow-xl">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100 dark:border-gray-800">
              <span className="text-sm font-bold text-gray-900 dark:text-white">Admin Panel</span>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <X size={18} />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center gap-3 h-14 px-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <Menu size={20} />
          </button>
          <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize">{activeTab}</span>
        </div>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {tabs[activeTab]}
        </main>
      </div>
    </div>
  );
}

export default AdminHomepage;
