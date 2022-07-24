import React, { useEffect, useState } from "react";

import { Button, Grid } from "@mui/material";

import { useStore } from "../../Store";
import api from "../../api/api";

import "./User.css";


import Posts from "./UserPosts";
import Games from "./UserGames";
import Reviews from "./UserReview";
import EditProfile from "./EditProfile";

function User() {
  const [state] = useStore();
  const [customer, setCustomer] = useState(state.customer);
  const [posts, setPosts] = useState([]);
  const [UpvoteStat, setUpvoteStat] = useState(0);
  const [currentOption, setCurrentOption] = useState("Posts");
  const Options = ["Posts", "Games", "Reviews"];

  useEffect(() => {
    setUpvoteStat(Math.floor(Math.random() * 4000 + 1000));
  }, []);

  useEffect(() => {
    api
      .get("/users/" + state.customer.id)
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state.customer]);

  useEffect(() => {
    api
      .get(`/posts?author=${customer.UserName}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <div
        className="UserBG"
        style={{ backgroundImage: `url(${customer.backgroundProfile})` }}
      ></div>
      <Grid container className="UserContainer">
        <Grid item xs={2} className="UserInfo">
          <div
            className="UserAvatar"
            style={{ background: `url(${customer.avatar})` }}
          ></div>
          <div className="UserName">{customer.UserName}</div>
          <div className="UserTitle">{customer.title}</div>
          <div className="UserStatBox">
            <div className="Stat">
              {customer.UserName !== undefined ? (
                <React.Fragment>
                  {posts.length}
                  <div>{posts.length > 1 ? "Posts" : "Post"}</div>
                </React.Fragment>
              ) : null}
            </div>
            <div className="Stat">
              {customer.UserName !== undefined ? (
                <React.Fragment>
                  {customer.games.length}
                  <div>{customer.games.length > 1 ? "Games" : "Game"}</div>
                </React.Fragment>
              ) : null}
            </div>
            <div className="Stat">
              {UpvoteStat}
              <div>Upvotes</div>
            </div>
          </div>
          <hr></hr>
          <div className="optionBox">
            {Options.map((option) => {
              if (currentOption === option) {
                return (
                  <Button
                    className="optionBtn currentOption"
                    key={option}
                    onClick={() => setCurrentOption(option)}
                  >
                    <div className="leftBtn"></div>
                    {option}
                    <div className="rightBtn"></div>
                  </Button>
                );
              } else {
                return (
                  <Button
                    className="optionBtn"
                    key={option}
                    onClick={() => setCurrentOption(option)}
                  >
                    {option}
                  </Button>
                );
              }
            })}
          </div>
          <EditProfile />
        </Grid>
        <Grid item xs={10} className="UserContent">
          <div className="UserGreeting">
            Welcome,
            <span style={{ color: "#3ec2ae" }}> {customer?.UserName} </span>!
          </div>
          {currentOption === "Posts" && <Posts posts={posts} />}
          {currentOption === "Games" && <Games />}
          {currentOption === "Reviews" && <Reviews />}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default User;
