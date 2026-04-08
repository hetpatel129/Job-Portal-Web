import { createSlice } from "@reduxjs/toolkit";

const feedBackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbacks: [],
  },
  reducers: {
    setAllFeedbacks: (state, action) => {
      state.feedbacks = action.payload;
    },
  },
});

export const { setAllFeedbacks } = feedBackSlice.actions;
export default feedBackSlice.reducer;
