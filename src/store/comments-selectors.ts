import { RootState } from "store";

export const SelectSortedComments = (state: RootState) =>
  [...state.comments].sort((a, b) => b.score - a.score);
