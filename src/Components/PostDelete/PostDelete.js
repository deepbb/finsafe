import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { deletePost } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";

function PostDelete(props) {
  const { id, title } = props;
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function actions() {
    return (
      <>
        <button style={{ fontSize: 18, padding: 10, margin: 20, borderRadius: 12 }} onClick={() => { props.deletePost(id); setShow(false); navigate("/") }} className="btn">
          Delete
        </button>
        <button style={{ fontSize: 18, padding: 10, margin: 20, borderRadius: 12 }} onClick={() => setShow(false)} className="btn">
          Cancel
        </button>
      </>
    );
  }

  function renderContent() {
    return (

      <span>
        Are you sure you want to delete the post <strong>{title}</strong> ?
      </span>
    );
  }

  return (
    <div>
      <div style={{ backgroundColor: "#072f5f", borderRadius: 8, padding: 10, color: "white", width: "fit-content" }} onClick={() => { setShow(true) }}>Delete Post</div>
      {show && (
        <Modal
          backgroundColor="white"
          style={{ backgroundColor: "white" }}
          header="Delete Blog"
          content={renderContent()}
          actions={actions()}
          onDismiss={() => setShow(false)}
        />
      )}
    </div>
  );
}

export default connect(null, { deletePost })(PostDelete);
