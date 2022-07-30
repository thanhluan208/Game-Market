import React, { useState } from "react";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Post({ post }) {
  const [open, setOpen] = useState(false);
  const [warning, setWarning] = useState(false);

  const removePost = () => {
  }

  return (
    <React.Fragment>
      <div
        onClick={() => setOpen(!open)}
        className={open ? "adminPostContent expand" : "adminPostContent"}
      >
        <div className="adminPost adminPostID">{post.id}</div>
        <div className="adminPost adminPostAuthor">{post.author}</div>
        <div className="adminPost adminPostTag">{post.tag}</div>
        <div className="adminPost adminPostCreatedAt">
          {post.createdAt.substring(0, 10)}
        </div>
        <div className="adminPost adminPostActions">
          <Button
            style={{
              color: "#fff",
              boxShadow: "0 5px 15px rgba(255,255,255,0.3)",
              borderRadius: "15px",
            }}
          >
            Edit this post
          </Button>
          <Button onClick={() => setWarning(true)} style={{ color: "red", position: "absolute", right: "0" }}>
            <DeleteForeverIcon />
          </Button>
        </div>
        <div className="adminPost adminPostBody">
          <div>Content: </div>
          {post.body}
        </div>
      </div>
      <div className={warning ? "modalAlert" : "disable"}>
        <div className="modalContent">
          <h3>
            Are you sure you want to delete this post ? <br></br>
            Post'id:
            <span style={{ color: "rgb(62 194 174)" }}>
              {" "}
              {post.id}
            </span>
          </h3>
          <Button onClick={() => setWarning(false)} className="modalButton">
            No
          </Button>
          <Button onClick={() => removePost()} className="modalButton">
            Yes
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Post;
