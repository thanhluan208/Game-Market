import React from "react";

import { Button } from "@mui/material";

import { useStore, actions } from "../../../Store";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { CreateNotification } from "../../../Component/Notification";




function PopularGame({ game, buyedGames }) {
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
    } else if (currentCart.find(cartItem => cartItem.name === item.name)) {
      CreateNotification("error", "Item already in cart", "Buy failed");
    } else {
      dispatch(actions.setCartItems(item));
    }
  };

  return (
    <div className="gameContainer">
      <div className="gameImgBox" style={{ background: `url(${game.imgURL})` }}>
        <Button
          onClick={() => {
            addToCart(game);
          }}
          className="addGame"
        >
          {" "}
          <AddShoppingCartIcon style={{ width: "50px", height: "50px" }} />{" "}
        </Button>
      </div>
      <div className="gameInfo">
        <div className="gameName">{game.name}</div>
        <div className="gamePrice">
          {game.price === 0 ? "free to play" : `$ ${game.price}`}
        </div>
      </div>
    </div>
  );
}

export default PopularGame;
