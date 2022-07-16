import React from "react";

import { Button, Rating } from "@mui/material";

import {useStore, actions} from '../../../Store'


function GameSlide({gameList}) {

  const [state, dispatch] = useStore()

  const currentCustomer = state.customer

  const addToCart = (item) => {
    currentCustomer.status === "active" ? dispatch(actions.setCartItems(item)) : alert("You need to log in to buy this item")
}



  return (
    <div className="gameSlideBox"  >
       
      {gameList.map((game, index) => (
            <div className="recommendGame" key={index}>
                <div className="recommendGameBackground" style={{background:`url(${game.imgURL})`}}></div>
                <div className="recommendGameImg" style={{background:`url(${game.imgURL})`}}></div>
                <div className="recommendGameInfo">
                    <div className="recommendGameName">{game.name}</div>
                    <Rating className="recommendGameStar" name="read-only" value={game.star} readOnly />
                    <div className="recommendGameDesc">{game.description}</div>
                    <Button onClick={() => {addToCart(game)}} className="recommendGameBtn">Buy now</Button>
                </div>
            </div>
        ))}
    </div>
  );
}

export default GameSlide;
