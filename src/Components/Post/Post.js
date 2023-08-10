import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostDelete from "../PostDelete";
import "./Post.css";

import { AuthContext } from "../../Context/AuthContext";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { getFileUrl } from "../../API/uploadFiles";
export default function Post(props) {
  dayjs.extend(relativeTime);

  const { isAdmin } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState(null);

  const { id, title, bodyMeta, identifier, comment, youtubeUrl, imageRef, body } = props.post;
  useEffect(() => {
    if (props.post.imageRef) {
      getFileUrl(props.post.imageRef, (url) => {
        setImageUrl(url);
      })
    }
  }, [])

  function renderAdmin() {
    return (
      <div className="menu">
        <div className="dropleft">

          <PostDelete id={id} title={bodyMeta} />

          {/* <div className="dropdown-menu">
            <Link className="dropdown-item" to={`/postedit/${id}`}>
              Edit
            </Link>
            <div className="dropdown-item">
     
            </div>
          </div> */}
        </div>
      </div>
    );
  }


  return (
    <div style={{ width: parseInt(window.innerWidth) > 600 ? "55%" : "90%" }} >
      <div className="grid" >
        <div >
          <div className="post-card">
            <div style={{ width: "100%" }} >
              {isAdmin ? renderAdmin() : <></>}
              <div className="card-body mr-1" style={{ width: "100%" }} >
                <h3 className="card-title">
                  <AiOutlineDoubleRight /> <Link to={`/post/${id}`}>{title}</Link>
                </h3>
                {imageUrl &&
                  <div style={{ marginTop: 20, marginBottom: 20, width: "100%" }}>
                    <img style={{ borderRadius: 12, width: "80%", height: 315 }} src={imageUrl}></img>
                  </div>}
                <p className="card-text">{body}</p>

                <p className="card-text">{bodyMeta}</p>

                <div className="row meta-data align-items-center">
                  <div className="col-12 col-sm-6">{identifier}</div>
                  <div className="col-12 col-sm-6">
                    <span className="ml-4">
                      <i className="far fa-comment"></i>
                      {comment ? comment.length : 0} Comments
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
