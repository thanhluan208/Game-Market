import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, Grid } from "@mui/material";

import Posts from './Posts'
import CreatePost from './CreatePost'

import { NotificationContainer } from "react-notifications";

import { useStore } from "../../Store";


import "./Blog.css";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [tag, setTag] = useState("one");
  const [state,] = useStore()

  const customerPost = state.customer.posts

  useEffect(() => {
    setPosts([...customerPost.filter(obj => {return obj.tag === tag})])
    axios
      .get(`https://mockend.com/mockend/demo/posts?tag_contains=${tag}&createdAt_order=asc`)
      .then((response) => {
        setPosts(P => {return [...P,...response.data]});
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tag])



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
          <Button onClick={() => {setTag("one")}} className={tag === "one" ? "Topic active" : "Topic"}>Topic A</Button>
          <Button onClick={() => {setTag("two")}} className={tag === "two" ? "Topic active" : "Topic"}>Topic B</Button>
          <Button onClick={() => {setTag("three")}} className={tag === "three" ? "Topic active" : "Topic"}>Topic C</Button>
        </div>
        <Posts posts={posts} tag={tag}/>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}

export default Blog;
