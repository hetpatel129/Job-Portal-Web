import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ role, children }) {
  const { authUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      // Send admin to adminLogin, others to login
      navigate(role === "admin" ? "/adminLogin" : "/login");
      return;
    }

    // Define role-based redirection paths
    const rolePaths = {
      student: "/studenthome",
      recruiter: "/recHome",
      admin: "/AdminHomepage",
    };

    // Redirect if user tries to access a different role's route
    if (authUser.role !== role) {
      navigate(rolePaths[authUser.role] || "/");
    }
  }, [authUser, navigate, role]);

  return authUser ? children : null;
}

export default ProtectedRoute;
