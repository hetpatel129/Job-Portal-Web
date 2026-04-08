import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { setUserCompanies } from "../redux/companySlice";
import apiRequest from "../utils/axiosUtility";

function useGetUserCompanies() {
  const { token, authUser } = useSelector((store) => store.auth);
  const { userCompanies } = useSelector((store) => store.company);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserCompanies = async () => {
      const endpoint = `${COMPANY_API_END_POINT}/getCompany`;
      try {
        const res = await apiRequest("GET", endpoint, {}, token, dispatch);

        if (res.status === 200) {
          dispatch(setUserCompanies(res.data.data));
        } else {
          dispatch(setUserCompanies([]));
        }
      } catch (error) {
        dispatch(setUserCompanies([]));
        console.error("Error fetching companies:", error);
      }
    };

    if (authUser) {
      fetchUserCompanies();
    }
  }, [token, authUser, dispatch]);
}

export default useGetUserCompanies;
