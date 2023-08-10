import React from "react";
import { createPortal } from "react-dom";

import "./Modal.css";

const Modal = ({ header, content, actions, onDismiss }) => {
  return createPortal(
    <div className="modal-container" onClick={() => onDismiss()}>
      <div style={{ backgroundColor: "rgba(255, 255, 255, 1)", width: "50%", height: "50%", alignSelf: "center", padding: 20 }} className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title" style={{ fontSize: 20 }}>{header}</h4>
        </div>
        <div className="modal-body">{content}</div>
        <div className="modal-footer" >{actions}</div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
