import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, Grid } from "@mui/material";

import Posts from './Posts'
import CreatePost from './CreatePost'

import { NotificationContainer } from "react-notifications";


import "./Blog.css";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [isActive, setIsActive] = useState(1);

  useEffect(() => {
    axios
      .get("https://mockend.com/mockend/demo/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])



  return (
    <Grid container className="blogContainer">
      <NotificationContainer/>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <div className="BlogTitle">
          Posts
          <CreatePost />
        </div>
        <div className="TopicBox">
          <Button onClick={() => {setIsActive(1)}} className={isActive % 3 === 1 ? "Topic active" : "Topic"}>Topic A</Button>
          <Button onClick={() => {setIsActive(2)}} className={isActive % 3 === 2 ? "Topic active" : "Topic"}>Topic B</Button>
          <Button onClick={() => {setIsActive(3)}} className={isActive % 3 === 0 ? "Topic active" : "Topic"}>Topic C</Button>
        </div>
        <Posts posts={posts} tag = {isActive}/>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}

export default Blog;
