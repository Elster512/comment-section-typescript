import { CommentType } from "./comment";
import { Reply } from "./reply";

export type DeleteReply = { id: CommentType["id"]; replyingToId: Reply["id"] };
