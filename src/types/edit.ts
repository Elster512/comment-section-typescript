import { CommentType } from "./comment";
import { Reply } from "./reply";

export type Edit = {
  id?: CommentType["id"];
  newContent: string;
  replyingToId?: Reply["replyingToId"];
};
