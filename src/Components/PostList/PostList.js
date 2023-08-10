import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../../Redux/actions";
import CardSkeleton from "../CardSkeleton";
import Post from "../Post";
import "../Post/Post.css"
import { AiFillStar } from "react-icons/ai"
import { MdArticle, MdOutlineNewspaper, MdNotificationsActive, MdAlbum } from "react-icons/md"
import { GoLaw } from "react-icons/go"
import PostDelete from "../PostDelete";
import { AuthContext } from "../../Context/AuthContext";

const PostList = (props) => {
  const [data, setData] = useState([]);
  const [postType, setType] = useState("gst")
  const [to, setTo] = useState(null);
  const [from, setFrom] = useState(null);
  const { isAdmin } = useContext(AuthContext);
  useEffect(() => {
    props.fetchPosts();
    renderPosts("gst")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { posts, loading } = props.data;

  function renderPosts(type) {
    setType(type);
    let postsValues = Object.values(posts);
    let newData = [];
    if (postsValues.length) {
      let postObj = {};
      postsValues.map((post) => {
        if (!postObj[post.id] && post.type === type) {
          if (!to || !from) {
            postObj[post.id] = 1;
            newData.push(post);
          } else if (post.date >= from && post.date <= to) {
            postObj[post.id] = 1;
            newData.push(post);
          }
        }
      });
      setData(newData);
    }
  }

  const getSource = (url) => {
    if (!url) return;
    let a = url.split("/")
    return (a[0] + "//www.youtube.com/embed/" + a[3]);
  }

  function renderAdmin(post) {
    return (
      <div className="menu">
        <div className="dropleft">

          <PostDelete id={post.id} title={post.videoTitle} />

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
    <div>
      <div>
        <center><h1 style={{ paddingBottom: "30px", fontSize: "30px", color: "#923304" }}>Latest News & Upadates</h1></center>
        <center>
          <button onClick={() => { renderPosts("gst") }} className="post-button1"><i style={{ padding: "5px 5px 5px 5px" }}><MdArticle /></i>GST</button>
          <button onClick={() => { renderPosts("int") }} className="post-button2"><i style={{ padding: "5px 5px 5px 5px" }}><MdOutlineNewspaper /></i>Income Tax</button>
          <button onClick={() => { renderPosts("vid") }} className="post-button3"><i style={{ padding: "5px 5px 5px 5px" }}><MdAlbum /></i>Videos</button>
          <button onClick={() => { renderPosts("notif") }} className="post-button4"><i style={{ padding: "5px 5px 5px 5px" }}><MdNotificationsActive /></i>Notifications</button>
        </center>
        <hr></hr>
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: 30, padding: 30, maxWidth: 700, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginRight: 20 }}>From:</div>
          <input
            style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 10 }}
            type="date"
            onChange={(e) => { setFrom(e.target.valueAsNumber) }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginRight: 20 }}>
          <div style={{ fontSize: 25, fontWeight: "bold", color: "#072f5f", marginLeft: 50, marginRight: 20 }}>To:</div>
          <input
            style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 10 }}
            type="date"
            onChange={(e) => { setTo(e.target.valueAsNumber) }}
          />
        </div>
        <div style={{ padding: 10, color: "white", backgroundColor: "#072f5f", borderRadius: 12, marginTop: 10 }} onClick={() => { renderPosts(postType); }}>Search Docs</div>
      </div>
      <div >
        {postType !== "vid" && <div style={{ width: "100%" }}>
          {!loading && data.length ? data.map(post => (
            <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "flex-start", flexWrap: "wrap", alignItems: "center" }}>
              <Post key={post.id} post={post} />
              {post.youtubeUrl && <div style={{ marginTop: 20, marginBottom: 20, width: parseInt(window.innerWidth) > 600 ? "30%" : "90%", marginLeft: parseInt(window.innerWidth) > 600 ? 70 : 0 }}>
                <div style={{ color: "#337AB7", fontWeight: "bold", fontSize: 30, marginBottom: 10 }}>{post.videoTitle}</div>
                <iframe height="250" width={"100%"} style={{ borderRadius: 12 }} src={getSource(post.youtubeUrl)}></iframe>
              </div>}
            </div>
          )) : <div>No posts to show</div>}
        </div>}
        {postType === "vid" && <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap" }}>
          {!loading && data.length ? data.map(post => (
            <div style={{
              padding: 10,
              borderRadius: 10,
              width: parseInt(window.innerWidth) > 600 ? "30%" : "90%",
              boxShadow: "1px 1px 1px 1px black"
            }}>
              {isAdmin ? renderAdmin(post) : <></>}
              <div style={{ color: "#337AB7", fontWeight: "bold", fontSize: 30, marginBottom: 10 }}>{post.videoTitle}</div>
              <iframe height="250" width={"100%"} style={{ borderRadius: 12 }} src={getSource(post.youtubeUrl)}></iframe>
            </div>
          )) : <div>No posts to show</div>}

        </div>}
        {/* <div className="box box2">
          <button className="box2-header"><AiFillStar />Featured Posts</button>
          <div className="box2-body" style={{ backgroundColor: " #A4E19B", display: "flex", flexWrap: "wrap", flexShrink: -1, flexGrow: 1, textOverflow: "clip" }}>
            <ol>
              {Object.values(posts).map((post, index) => {
                if (index <= 5)
                  return (
                    <li>
                      <div style={{ display: "flex", flexWrap: "wrap", flexShrink: -1 }}>
                        {post.bodyMeta}
                      </div>
                    </li>
                  );
                else return null
              })}
            </ol>
          </div>
        </div> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};
export default connect(mapStateToProps, { fetchPosts })(PostList);
