import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MarkdownEditor from "../../Components/MarkdownEditor";
import { fetchPost, editPost } from "../../Redux/actions";
import { isBlank, isEmptyObj } from "../utilities";
import { useParams } from "react-router-dom";

const PostEdit = (props) => {
  const [title, setTitle] = useState("");
  const [bodyMeta, setBodyMeta] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  const { id } = useParams();

  useEffect(() => {
    props.fetchPost(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.post) {
      const { body, bodyMeta, title } = props.post;
      console.log(props.post);
      setTitle(title);
      setBodyMeta(bodyMeta);
      setBody(body);
    }
  }, [props.post]);

  useEffect(() => {
    if (props.errors) setErrors(props.errors);
  }, [props.errors]);

  function onEditPost(event) {
    event.preventDefault();

    const post = {
      title,
      bodyMeta,
      body,
    };

    let err = {};
    if (isBlank(post.title)) err.title = "This can't be empty!";
    if (isBlank(post.bodyMeta)) err.bodyMeta = "This can't be empty!";
    if (isBlank(post.body)) err.body = "This can't be empty!";

    if (isEmptyObj(err)) props.editPost(props.post.id, post);

    setErrors(err);
  }

  return (
    <div className="container">
      <form className="blog-form mt-2">
        <h2>Edit your post</h2>
        <div className="form-group mt-4">
          <label>Title</label>
          <textarea
            type="textarea"
            className="form-control"
            rows="2"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          ></textarea>
          {errors.title ? (
            <small className="error-message">{errors.title}</small>
          ) : null}
        </div>
        <div className="form-group">
          <label>Short Description</label>
          <textarea
            type="textarea"
            className="form-control"
            rows="2"
            value={bodyMeta}
            onChange={(event) => {
              setBodyMeta(event.target.value);
            }}
          ></textarea>
          {errors.bodyMeta ? (
            <small className="error-message">{errors.bodyMeta}</small>
          ) : null}
        </div>
        <div className="form-group">
          <label>Post Content</label>
          <MarkdownEditor
            editorPlaceholder="Write your content (markdown supported)"
            editorRows="25"
            editorValue={body}
            editorSetValue={setBody}
            previewBg={true}
          />
          {errors.body ? (
            <small className="error-message">{errors.body}</small>
          ) : null}
        </div>
        <div className="form-group row justify-content-center">
          <button type="button" className="btn" onClick={onEditPost}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.data.post,
  };
};

export default connect(mapStateToProps, { fetchPost, editPost })(PostEdit);
