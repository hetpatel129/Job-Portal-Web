import { Herosection } from "../Herosection";
import CategoryCarousal from "../CategoryCarousal";
import LatestJob from "../LatestJob";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { logOutHandler } from "../../utils/logoutHandler";
import FeedbackForm from "../FeedBackForm";

export const Home = () => {
  useGetAllJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token);

    if (!token) {
      try {
        console.log("hh");
        logOutHandler(dispatch, navigate, token);
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  }, [dispatch, navigate]);
  return (
    <>
      <Herosection />
      <CategoryCarousal />
      <LatestJob />
      <FeedbackForm />
    </>
  );
};
