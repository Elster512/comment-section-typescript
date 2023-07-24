import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "types";

export const loadUser = createAsyncThunk<User>("user/load", async () => {
  const response = await fetch("http://localhost:3001/currentUser/");
  const data = (await response.json()) as User;
  return data;
});
