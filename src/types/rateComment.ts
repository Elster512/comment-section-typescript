import { CommentType } from "./comment";
import { Reply } from "./reply";

export type RateComment = {
  id?: CommentType["id"];
  replyingToId?: Reply["replyingToId"];
  rating: number;
};
