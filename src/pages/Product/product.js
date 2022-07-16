import React from "react";
import { Button, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";

import { useStore } from "../../Store";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import csgo1 from "../../Images/ProductImg/csgo1.jpg";
import csgo2 from "../../Images/ProductImg/csgo2.jpg";
import csgo3 from "../../Images/ProductImg/csgo3.jpg";
import csgo4 from "../../Images/ProductImg/csgo4.jpg";

import "./Product.css";

function Product() {
  // eslint-disable-next-line
  const [gameName, ] = useStore();

  const game = {
    "Counter Strike:Global Offensive": {
      title: "Counter Strike:Global Offensive",
      description:
        " Expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content",
      developer: "Valve, Hidden Path Entertainment",
      publisher: "Valve",
      releaseDate: "22 Aug, 2012",
      review: "very positive",
      tags: ["FPS", "Shooter", "Multiplayer", "Competitive", "Action"],
      img: [csgo1, csgo2, csgo3, csgo4],
    },
  };

  const currentGame = game[gameName.GameName];

  return (
    <Grid container className="productContainer">
      <Grid className="gameDetailContainer" item xs={5}>
        <div className="gameTitle">{currentGame?.title}</div>
        <div className="gameDesc">{currentGame?.description}</div>
        <div className="gameDetailBox">
          <div className="gameDetail">
            <div className="gameDetailKey">Title</div>
            <div className="gameDetailValue">{currentGame?.developer}</div>
            <hr></hr>
          </div>
          <div className="gameDetail">
            <div className="gameDetailKey">Publisher</div>
            <div className="gameDetailValue">{currentGame?.publisher}</div>
            <hr></hr>
          </div>
          <div className="gameDetail">
            <div className="gameDetailKey">ReleaseDate</div>
            <div className="gameDetailValue">{currentGame?.releaseDate}</div>
            <hr></hr>
          </div>
          <div className="gameDetail">
            <div className="gameDetailKey">Review</div>
            <div className="gameDetailValue">{currentGame?.review}</div>
          </div>
          <Button className="readMore">BUY NOW !</Button>
        </div>
      </Grid>
      <Grid className="gamePreview" item xs={7}>
        <Swiper
          style={{
            height: "100%",
            borderRadius: "20px",
            width: "50%",
            boxShadow: "0 15px 25px #3ec2ae",
          }}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 2500, disableOnInteraction: true }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <div className="tagBox">
            {currentGame?.tags.map((tag, index) => {
              return (
                <div className="tag" key={index}>
                  {tag}
                </div>
              );
            })}
          </div>
          {currentGame?.img.map((image, index) => {
            return (
              <SwiperSlide
                style={{
                  background: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                key={index}
              ></SwiperSlide>
            );
          })}
          
        </Swiper>
      </Grid>
    </Grid>
  );
}

export default Product;
