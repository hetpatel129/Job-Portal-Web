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

  return (
    <div className="bg-[#ffffff] mb-3 navbar">
      <div className="flex items-center justify-between  sm:justify-between px-4  mx-auto mt-4 menu ">
        <h1
          className="text-lg md:text-2xl font-bold cursor-pointer"
          onClick={handleLogo}
        >
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        <div className="flex items-center gap-3 menu2">
          <button
            className="text-gray-700 focus:outline-none menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* Mobile menu button icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <ul
              className={`${
                isMenuOpen ? "flex" : "hidden"
              }  items-center  gap-3 font-medium  bg-white unorder `}
            >
              {role === "student" ? (
                <>
                  <li>
                    <Link to="/" className="block px-4 py-2 hover:bg-gray-100">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jobs"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/browse"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Browse
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/admin/companies"
                      className="block  py-2 hover:bg-gray-100"
                    >
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/jobs"
                      className="block  py-2 hover:bg-gray-100"
                    >
                      Jobs
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="flex items-center  gap-3">
              {authUser ? (
                <li className="relative">
                  <Popover>
                    <PopoverTrigger>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={
                            authUser?.profile?.profilePhoto ||
                            "default-avatar.png"
                          }
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 mt-2 bg-[#fefefe]">
                      <div className="flex items-center gap-7 p-4">
                        <Avatar>
                          <AvatarImage
                            src={
                              authUser?.profile?.profilePhoto ||
                              "default-avatar.png"
                            }
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <h1 className="font-bold">{authUser?.fullname}</h1>
                          <p>{authUser?.profile?.bio}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start p-4">
                        {role === "student" && (
                          <Link to="/profile">
                            <Button variant="link">
                              <User2 /> &nbsp; View Profile
                              <User2 /> &nbsp; View Profile
                            </Button>
                          </Link>
                        )}
                        {role === "recruiter" && (
                          <Link to="/recProfile">
                            <Button variant="link">
                              <User2 /> &nbsp; View Profile
                            </Button>
                          </Link>
                        )}
                        {role === "admin" && (
                          <Link to="/admin/profile">
                            <Button variant="link">
                              <User2 /> &nbsp; View Profile
                            </Button>
                          </Link>
                        )}
                        <Button variant="link" onClick={logOutHandler}>
                          <LogOut /> &nbsp; Logout
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login">
                      <Button
                        variant="outline"
                        className="block w-full md:w-auto"
                      >
                        Login
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      <Button
                        variant="outline"
                        className="bg-[#20B2AA] text-white hover:bg-[#008080] hover:text-white block w-full md:w-auto"
                      >
                        Signup
                      </Button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
