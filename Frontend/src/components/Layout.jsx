import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import useCheckAuth from "../hooks/useCheckAuth";
import Loader from "./Loader";
import Footer from "./Footer";
import { Navbar } from "./ui/Navbar";

function Layout() {
  useCheckAuth();

  const { apiLoading } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <main className="relative flex-grow min-h-[567px]">
        <Outlet />
        {apiLoading && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/20 dark:bg-black/20 backdrop-blur-sm pointer-events-none">
            <div className="pointer-events-auto">
              <Loader />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
