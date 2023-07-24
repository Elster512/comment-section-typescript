import { User } from "./user";
import { CommentType } from "./comment";

export type Reply = {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  replyingToId: CommentType["id"];
  replyingTo: User["username"];
  user: User;
};
