import { Reply } from "./reply";
import { User } from "./user";

export type CommentType = {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];
};
