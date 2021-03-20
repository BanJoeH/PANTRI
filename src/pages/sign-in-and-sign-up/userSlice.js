import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  displayName: "",
  email: "",
  createdAt: 0,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.id = action.payload.id;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.createdAt = action.payload.createdAt;
      state.isSuccess = true;
      return state;
    },
    clearUser: () => initialState,
  },
});

const { actions, reducer } = userSlice;

export const { setCurrentUser, clearUser } = actions;

export default reducer;

export const userSelector = (state) => state.user;
