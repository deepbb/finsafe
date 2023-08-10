import React from "react";
import "./Loader.css";

const Loader = () => (
  <div className="loader-overlay">
    <div className="loader spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Loader;
