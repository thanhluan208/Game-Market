import React, { useState } from "react";

import { Button, Grid } from "@mui/material";

import Posts from "./Posts";
import CreatePost from "./CreatePost";

import { NotificationContainer } from "react-notifications";


import "./Blog.css";

function Blog() {
  const [tag, setTag] = useState("one");

  return (
    <Grid container className="blogContainer">
      <NotificationContainer />
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <div className="BlogTitle">
          Posts
          <CreatePost />
        </div>
        <div className="TopicBox">
          <Button
            onClick={() => {
              setTag("one");
            }}
            className={tag === "one" ? "Topic active" : "Topic"}
          >
            Topic A
          </Button>
          <Button
            onClick={() => {
              setTag("two");
            }}
            className={tag === "two" ? "Topic active" : "Topic"}
          >
            Topic B
          </Button>
          <Button
            onClick={() => {
              setTag("three");
            }}
            className={tag === "three" ? "Topic active" : "Topic"}
          >
            Topic C
          </Button>
        </div>
        <Posts tag={tag} />
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}

export default Blog;
