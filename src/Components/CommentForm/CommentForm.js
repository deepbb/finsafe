import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { submitComment } from "../../Redux/actions";
import MarkdownEditor from "../MarkdownEditor";
import "./CommentForm.css";
import { isBlank, isEmptyObj } from "../../Pages/utilities";
import { AuthContext } from "../../Context/AuthContext";

const CommentForm = (props) => {
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const { auth, getIdentifier } = useContext(AuthContext);

  const postComment = (event) => {
    event.preventDefault();
    const data = {
      body: comment,
      identifier: getIdentifier(),
    };

    let err = {};
    if (isBlank(data.body)) err.comment = "Can't be empty!";

    if (isEmptyObj(err)) {
      props.submitComment(data, props.post.id);
      setComment("");
    }

    setErrors(err);
  };

  return (
    <div className="comment-form">
      {auth && (
        <form
          className="form row justify-content-center"
          onSubmit={postComment}
        >
          <div className="col-12">
            <div className="form-group mb-2">
              <MarkdownEditor
                editorPlaceholder="What your thoughts? (markdown supported)"
                editorRows="3"
                editorValue={comment}
                editorSetValue={setComment}
                previewBg={true}
              />

              {errors.comment ? (
                <small className="error-message">{errors.comment}</small>
              ) : null}
            </div>
            <div className="form-group row justify-content-end m-0">
              <button type="submit" className="btn">
                Post
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.data.post,
    ui: state.ui,
  };
};
export default connect(mapStateToProps, { submitComment })(CommentForm);
