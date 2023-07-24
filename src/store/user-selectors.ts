import { RootState } from "store";

export const SelectUserName = (state: RootState) => state.user.username;
export const SelectUser = (state: RootState) => state.user;
