import React from "react";

import { Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import { NotificationContainer } from "react-notifications";

import "./Home.css";

import News from "./News";
import Game from "./topGame";
import PreviewGame from "./previewGame";

import newsImage1 from "../../Images/homeImg/newsImage1.jpg";
import newsImage2 from "../../Images/homeImg/newsImage2.jpg";
import newsImage3 from "../../Images/homeImg/newsImage3.jpg";
import topGameImg1 from "../../Images/homeImg/topGameImg1.jpg";
import topGameImg2 from "../../Images/homeImg/topGameImg2.jpg";
import topGameImg3 from "../../Images/homeImg/topGameImg3.jpg";

function Home() {
  const newsInformation = {
    news1: {
      title: "Cyperpunk 2077 co-play event in November 25",
      date: "12/08/2022",
      imgURL: newsImage1,
    },
    news2: {
      title: "Pre-order cyperpunk 2077 right now",
      date: "07/07/2022",
      imgURL: newsImage2,
    },
    news3: {
      title: "Valde about to release Counter Strike: Global Offensive Source 2",
      date: "20/08/2002",
      imgURL: newsImage3,
    },
    news4: {
      title: "Assasin Creed Valhala is on the deck right now !",
      date: "18/01/2002",
      imgURL: newsImage3,
    },
  };

  const topGames = {
    game1: {
      name: "Counter Strike:Global Offensive",
      devices: ["PC", "laptop"],
      starPoint: 9.5,
      imgURL: topGameImg1,
    },
    game2: {
      name: "Dota2",
      devices: ["PC"],
      starPoint: 6,
      imgURL: topGameImg2,
    },
    game3: {
      name: "Assasin Creed Valhala",
      devices: ["PC", "laptop", "Steam Deck", "Xbox1", "PS5"],
      starPoint: 8,
      imgURL: topGameImg3,
    },
  };

  return (
    <div className="homeContainer">
      <NotificationContainer/>
      <div className="subContainerLeft">
        <PreviewGame />
        <div className="topGameBox">
          <div className="topGameHeader">
            <div className="icon">
              <SportsEsportsIcon />
            </div>
            <div className="header">The Lastest Analyzes</div>
          </div>
          <div className="topGameContent">
            {Object.keys(topGames).map((topGame, index) => {
              return <Game key={index} information={topGames[topGame]} />;
            })}
          </div>
        </div>
      </div>
      <div className="subContainerRight">
        <div className="homeNews">
          <div className="header">
            <div></div>
            <h1>Recent News</h1>
            <Button className="more">
              <MoreHorizIcon />
            </Button>
          </div>
          {Object.keys(newsInformation).map((news, index) => {
            return <News key={index} information={newsInformation[news]} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
