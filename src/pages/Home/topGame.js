import React, { useState } from "react";

import { Button } from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";

import { useStore, actions } from '../../Store'


import { CreateNotification } from "../../Component/Notification";


function TopGame({ information }) {

  const [state, dispatch] = useStore()

  const currentCustomer = state.customer

 
  const [bookmarkActive, setBookmarkActive] = useState(false);
  const [upvoteActive, setupvoteActive] = useState(false);
  const [downvoteActive, setdownvoteActive] = useState(false);

  
  

  return (
    <div className="gameBox">
     
      <div className="toolBox">
        <Button
          className={bookmarkActive ? "bookMark" : "tool"}
          onClick={() => {currentCustomer.status === "nonActive" ? CreateNotification("error","Please log in to bookmark this game!","Bookmark failed !") : setBookmarkActive(!bookmarkActive)}}
        >
          <StarIcon />
        </Button>
        <Button
          className={upvoteActive ? "upvote" : "tool"}
          onClick={() => {currentCustomer.status === "nonActive" ? CreateNotification("error","Please log in to upvote this game!","Upvote failed") : setupvoteActive(!upvoteActive)}}
        >
          <ThumbUpIcon />
        </Button>
        <Button
          className={downvoteActive ? "downvote" : "tool"}
          onClick={() => {currentCustomer.status === "nonActive" ? CreateNotification("error","Please log in to downvote this game!","Downvote failed") : setdownvoteActive(!downvoteActive)}}
        >
          <ThumbDownIcon />
        </Button>
        <Button onClick = { () => {dispatch(actions.setGameName(information.name))}}>
          <Link className="order tool" to="/product">
            <MoreHorizIcon />
          </Link>
        </Button>
      </div>
      <div
        className="topGame"
        style={{ background: `url(${information.imgURL})` }}
      >
        <div className="deviceBox">
          {information.devices.map((device, index) => (
            <div key={index} className="device">{device}</div>
          ))}
        </div>
        <div className="starPoint">
          <StarIcon
            style={{ position: "absolute", color: "#3ec2ae", top: "-20%" }}
          />
          {information.starPoint}
        </div>
      </div>
      <div className="nameGame">{information.name}</div>
    </div>
  );
}

export default TopGame;
