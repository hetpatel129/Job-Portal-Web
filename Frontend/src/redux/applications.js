import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",

  initialState: {
    applicants: [],
    allApplications: [],
  },
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },
    setAllApplications: (state, action) => {
      state.allApplications = action.payload;
    },
  },
});

export const { setAllApplicants, setAllApplications } =
  applicationSlice.actions;
export default applicationSlice.reducer;
