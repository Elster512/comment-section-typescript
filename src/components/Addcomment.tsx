import { useSelector } from "react-redux";
import Card from "../UI/Card";

import styles from "./Addcomment.module.css";

import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "store";
import { SelectUser } from "store/user-selectors";
import { CommentType, Reply } from "types";
import { addComment, addReplyOnServer } from "store/CommentsAction";

interface AddcommentProps {
  toReply?: string;
  replyingToId?: string;
  toUser?: string;
  replying?: () => void;
}
type FormFields = {
  content: HTMLTextAreaElement;
};
const Addcomment = (props: AddcommentProps) => {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch();
  const user = useSelector(SelectUser);
  const addCommentHandler: React.FormEventHandler<
    HTMLFormElement | FormFields
  > = (event) => {
    event.preventDefault();
    const comment: CommentType = {
      id: nanoid(),
      content: event.currentTarget.content.value,
      createdAt: "now",
      score: 0,
      user: {
        image: user.image,
        username: user.username,
      },
      replies: [],
    };
    event.currentTarget.content.value = "";
    dispatch(addComment(comment));
  };

  const addReplyHandler: React.FormEventHandler<
    HTMLFormElement | FormFields
  > = (event) => {
    event.preventDefault();
    if (props.toUser && props.replyingToId && props.replying) {
      const comment: Reply = {
        id: nanoid(),
        content: event.currentTarget.content.value.replace(
          `@${props.toUser}`,
          ""
        ),
        createdAt: "now",
        score: 0,
        user: {
          image: user.image,
          username: user.username,
        },
        replyingTo: props.toUser,
        replyingToId: props.replyingToId,
      };
      event.currentTarget.content.value = "";
      dispatch(addReplyOnServer(comment));
      props.replying();
    }
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.value = props.toUser ? `@${props.toUser} ` : "";
      textRef.current.focus();
    }
  }, [props.toUser]);
  return (
    <form onSubmit={props.toUser ? addReplyHandler : addCommentHandler}>
      <Card
        className={`${styles.addcomment} ${props.toReply && styles.replying}`}
      >
        <img src={user.image.png} alt="dasd" />
        <textarea
          placeholder="Add comment..."
          name="content"
          required
          ref={textRef}
        />
        <button>{props.toUser ? "REPLY" : "SEND"}</button>
      </Card>
    </form>
  );
};

export default Addcomment;
