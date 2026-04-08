import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function StudentProtected({ children }) {
  const { authUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    } else if (authUser.role === "recruiter") {
      navigate("/");
    }
  }, [authUser, navigate]);

  // Render children only if the user is authenticated and is not a recruiter
  return <>{children} </>;
}

export default StudentProtected;
