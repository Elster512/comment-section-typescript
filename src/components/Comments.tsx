import { useEffect } from "react";
import Comment from "./Comment";
import styles from "./Comments.module.css";
import { useSelector } from "react-redux";

import { SelectSortedComments } from "store/comments-selectors";
import { useAppDispatch } from "store";
import { CommentType } from "types";
import { loadAllComments } from "store/CommentsAction";

const Comments = () => {
  const comments = useSelector(SelectSortedComments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAllComments());
  }, [dispatch]);

  return (
    <div className={styles.comments}>
      {comments.map((comment: CommentType) => {
        return <Comment key={comment.id} {...comment} />;
      })}
    </div>
  );
};

export default Comments;
