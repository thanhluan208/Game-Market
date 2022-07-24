import React from "react";

import { Button, Rating } from "@mui/material";

import { useStore, actions } from "../../../Store";
import { CreateNotification } from "../../../Component/Notification";

function GameSlide({ gameList, buyedGames }) {
  const [state, dispatch] = useStore();

  const currentCustomer = state.customer;
  const currentCart = state.cartItems;
  


  const addToCart = (item) => {
    if (currentCustomer.UserName === undefined) {
      CreateNotification("error", "Please login to add to cart", "Buy failed");
    } else if (buyedGames.find(game => {
      return(game.cartItems.find(cartItem => {
        return(cartItem.name === item.name)
      }))
    })) {
      CreateNotification(
        "error",
        "You have already bought this game before",
        "Buy failed"
      );
    } else if (currentCart.includes(item, 0)) {
      CreateNotification("error", "Item already in cart", "Buy failed");
    } else {
      dispatch(actions.setCartItems(item));
    }
  };

  return (
    <div className="gameSlideBox">
      {gameList.map((game, index) => (
        <div className="recommendGame" key={index}>
          <div
            className="recommendGameBackground"
            style={{ background: `url(${game.imgURL})` }}
          ></div>
          <div
            className="recommendGameImg"
            style={{ background: `url(${game.imgURL})` }}
          ></div>
          <div className="recommendGameInfo">
            <div className="recommendGameName">{game.name}</div>
            <Rating
              className="recommendGameStar"
              name="read-only"
              value={game.star}
              readOnly
            />
            <div className="recommendGameDesc">{game.description}</div>
            <Button
              onClick={() => {
                addToCart(game);
              }}
              className="recommendGameBtn"
            >
              Buy now
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GameSlide;
