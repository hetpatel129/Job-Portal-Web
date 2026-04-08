import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthRedirect({ component }) {
  const { authUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      if (authUser.role === "student") {
        navigate("/studenthome"); // Redirect student to home
      } else if (authUser.role === "recruiter") {
        navigate("/recHome"); // Redirect admin to companies
      } else if (authUser.role === "admin") {
        navigate("/AdminHomepage"); // Redirect admin to companies
      }
    }
  }, [authUser, navigate]);

  // Render the component if the user is not logged in
  return !authUser ? component : null;
}

export default AuthRedirect;
