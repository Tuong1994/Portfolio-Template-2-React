import { createSlice } from "@reduxjs/toolkit";

const langSlice = createSlice({
  name: "langs",
  initialState: 1,
  reducers: {
    changeENG: (state, action) => {
      state = action.payload;
    },
    changeVN: (state, action) => {
      state = action.payload;
    },
  },
});

const { actions, reducer } = langSlice;
export const { changeENG, changeVN } = actions;
export default reducer;
