import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constant";
import { setAllUsers } from "../redux/authSlice";
import apiRequest from "../utils/axiosUtility";
import { useEffect } from "react";

const useGetAllUsers = () => {
  const { token, authUser } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllUsers = async () => {
      const endpoint = `${USER_API_END_POINT}/getAllUsers`;
      try {
        const res = await apiRequest("GET", endpoint, {}, token, dispatch);
   
       
       
        if (res.status === 200) {
          dispatch(setAllUsers(res.data.data));
        } else {
          dispatch(setAllUsers([]));
        }
      } catch (error) {
        dispatch(setAllUsers([]));

        console.error("Error fetching Users:", error);
      } 
    };
    if (authUser) {
      fetchAllUsers();
    }
  }, [token, authUser, dispatch]);
};

export default useGetAllUsers;
