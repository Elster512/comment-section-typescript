import { createSlice } from "@reduxjs/toolkit";
import { loadUser } from "./user-actions";

type UserSlice = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};
const initialState: UserSlice = {
  image: {
    png: "",
    webp: "",
  },
  username: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.image = action.payload.image;
      state.username = action.payload.username;
    });
  },
});

export default userSlice;
