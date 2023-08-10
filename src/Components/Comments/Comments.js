import React from "react";
import "./Comments.css";

const Comments = ({ comments }) => {
  return (
    <div className="comments">
      {comments && comments.length > 0
        ? comments.map((comment, index) => {
            const { identifier, body, createdAt } = comment;

            return (
              <div key={index}>
                <div>{identifier}</div>
                <div>{body}</div>
                <div>{createdAt}</div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Comments;
