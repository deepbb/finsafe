import React, { useContext } from "react";
import { usePreventUnAuthUser } from "../../Hooks/redirect";
import PostList from "../../Components/PostList";
import "./Blog.css";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

export default function Blog() {
  const { auth } = useContext(AuthContext);
  // usePreventUnAuthUser("blog", auth);
  return (
    <div className="justify-content-center mt-4" style={{ display: "flex", justifyContent: "center", flexDirection: "column", padding: 20 }}>
      <section className="col-12 col-sm-8 blogs-list">
        <PostList />
      </section>
      <h1>
        <Link to="/createpost">Create Post</Link>
      </h1>
    </div>
  );
}
