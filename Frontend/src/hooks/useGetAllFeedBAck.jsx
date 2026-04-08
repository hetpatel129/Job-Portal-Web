import { useEffect, useCallback } from "react";
import { FEEDBACK_API_END_POINT } from "../utils/constant";
import { setApiLoading } from "../redux/authSlice";
import apiRequest from "../utils/axiosUtility";
import { useDispatch, useSelector } from "react-redux";
import { setAllFeedbacks } from "../redux/feedback";

const useGetAllFeedBack = () => {
  const { token, authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const fetchAllFeedBack = useCallback(async () => {
    if (!token) return;

    const endpoint = `${FEEDBACK_API_END_POINT}/getAllFeedBack`;
    try {

      const res = await apiRequest("GET", endpoint, {}, token, dispatch);
     
     

      if (res.status === 200) {
        dispatch(setAllFeedbacks(res.data.data));
      } else {
        dispatch(setAllFeedbacks([]));
      }
    } catch (error) {
      dispatch(setAllFeedbacks([]));
      console.error("Error fetching feedback:", error);
    } 
  }, [token, dispatch]);

  useEffect(() => {
    if (authUser) {
      fetchAllFeedBack();
    }
  }, [authUser, fetchAllFeedBack]);
};

export default useGetAllFeedBack;
