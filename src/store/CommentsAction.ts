import { CommentType, RateComment, Reply } from "types";
import { DeleteReply } from "types/deleteReply";
import { Edit } from "types/edit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommentSlice } from "./commentsSlice";
export const loadAllComments = createAsyncThunk<
  CommentType[],
  undefined,
  { rejectValue: string }
>("comments/load-all", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3001/comments/");
    const data = (await response.json()) as CommentType[];

    return data;
  } catch (error) {
    return rejectWithValue("Error");
  }
});
export const addComment = createAsyncThunk<CommentType, CommentType>(
  "comments/add-comment",
  async (comment) => {
    try {
      const response = await fetch(`http://localhost:3001/comments/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(comment),
      });
      const data = await response.json();

      return data;
    } catch (error) {
      //покакал
    }
  }
);
export const deleteComment = createAsyncThunk<
  CommentType["id"],
  string,
  { rejectValue: string }
>("comments/delete-comment", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:3001/comments/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
    await response.json();

    return id;
  } catch (error) {
    return rejectWithValue("Error");
  }
});
export const addReplyOnServer = createAsyncThunk<
  CommentType,
  Reply,
  { state: { comments: CommentSlice } }
>("comments/add-reply", async (reply, { getState }) => {
  try {
    const newComment: CommentType = JSON.parse(
      JSON.stringify(
        getState().comments.find((comment) => comment.id === reply.replyingToId)
      )
    );
    newComment.replies.push(reply);
    const response = await fetch(
      `http://localhost:3001/comments/${reply.replyingToId}`,
      {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ replies: newComment.replies }),
      }
    );
    const comment = await response.json();
    return comment;
  } catch (error) {}
});
export const deleteReplyOnServer = createAsyncThunk<
  CommentType,
  DeleteReply,
  { state: { comments: CommentSlice } }
>("comments/delete-reply", async ({ id, replyingToId }, { getState }) => {
  try {
    const newComment: CommentType = JSON.parse(
      JSON.stringify(
        getState().comments.find((comment) => comment.id === replyingToId)
      )
    );
    newComment.replies = newComment.replies.filter(
      (reply: Reply) => reply.id !== id
    );
    const response = await fetch(
      `http://localhost:3001/comments/${replyingToId}`,
      {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ replies: newComment.replies }),
      }
    );
    const comment = await response.json();
    return comment;
  } catch (error) {}
});
export const editCommentOnServer = createAsyncThunk<
  CommentType,
  Edit,
  { state: { comments: CommentSlice } }
>(
  "comments/edit-reply",
  async ({ id, newContent, replyingToId }, { getState }) => {
    try {
      let editedId: string = "";
      let newComment: CommentType;
      if (replyingToId) {
        editedId = replyingToId;
        newComment = JSON.parse(
          JSON.stringify(
            getState().comments.find((value) => value.id === replyingToId)
          )
        );
        const reply = newComment.replies.find(
          (reply: Reply) => reply.id === id
        );
        if (reply) {
          reply.content = newContent;
        }
        const response = await fetch(
          `http://localhost:3001/comments/${editedId}`,
          {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              replies: newComment.replies,
            }),
          }
        );
        return await response.json();
      } else {
        if (id) {
          editedId = id;
        }
        newComment = JSON.parse(
          JSON.stringify(
            getState().comments.find((value: CommentType) => value.id === id)
          )
        );
        newComment.content = newContent;
        const response = await fetch(
          `http://localhost:3001/comments/${editedId}`,
          {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              content: newComment.content,
            }),
          }
        );
        return await response.json();
      }
    } catch (error) {}
  }
);
export const rateCommentOnServer = createAsyncThunk<
  CommentType,
  RateComment,
  { state: { comments: CommentSlice } }
>(
  "comments/rate-comment-reply",
  async ({ id, replyingToId, rating }, { getState }) => {
    try {
      const editedId = replyingToId ? replyingToId : id;
      const newComment: CommentType = JSON.parse(
        JSON.stringify(
          getState().comments.find(
            (value: CommentType) => value.id === editedId
          )
        )
      );
      if (replyingToId) {
        const reply = newComment.replies.find(
          (reply: Reply) => reply.id === id
        );
        if (reply) {
          reply.score += rating;
        }
      } else {
        newComment.score += rating;
      }
      const response = await fetch(
        `http://localhost:3001/comments/${editedId}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newComment),
        }
      );
      const updatedComment = await response.json();
      return updatedComment;
    } catch (error) {}
  }
);
