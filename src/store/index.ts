import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import commentSlice from "./commentsSlice";

import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    comments: commentSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
