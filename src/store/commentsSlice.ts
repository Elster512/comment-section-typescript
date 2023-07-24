import { createSlice } from "@reduxjs/toolkit";
import { CommentType } from "types";
import { addComment, deleteComment, loadAllComments } from "./CommentsAction";

export type CommentSlice = CommentType[];

const initialState: CommentSlice = [];
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAllComments.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload;
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (action.payload) {
          return [...state, action.payload];
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        if (action.payload) {
          return [...state].filter((comment) => comment.id !== action.payload);
        }
      })
      .addMatcher(
        (action) => action.type.endsWith("reply/fulfilled"),
        (state, action) => {
          const updatedComment = action.payload;
          if (updatedComment) {
            const index = state.findIndex(
              (comment) => comment.id === action.payload.id
            );
            state[index] = updatedComment;
          }
        }
      );
  },
});

export default commentSlice;
