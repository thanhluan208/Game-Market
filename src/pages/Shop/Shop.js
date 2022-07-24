import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Grid, Button } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ClearIcon from "@mui/icons-material/Clear";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useStore, actions } from "../../Store";
import api from "../../api/api";

import CartItem from "./shopComponent/CartItem";
import PopularGame from "./shopComponent/PopularGame";
import GameSlide from "./shopComponent/GameSlide";
import TopGameDownloaded from "./shopComponent/TopGameDownloaded";

import "./Shop.css";

import { NotificationContainer } from "react-notifications";
import { CreateNotification } from "../../Component/Notification";



function Shop() {
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [cartActive, setCartActive] = useState(false);
  const [popularGame, setPopularGame] = useState([]);
  const [buyedGames, setBuyedGames] = useState([]);
  const [state, dispatch] = useStore();

  const [cartItem, setCartItem] = useState(state.cartItems);

  const currentCustomer = state.customer;



  useEffect(() => {
    api
      .get("/games")
      .then((res) => {
        setPopularGame(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    const localCart = JSON.parse(localStorage.getItem('order'))
    if (localCart !== null) {
      console.log(localCart);
      dispatch(actions.replaceCartItems(localCart));
    }
  }, []);

  useEffect(() => {
    setCartItem(state.cartItems);
    setTotal(state.cartItems.length);
    if (state.cartItems.length > 0) {
      localStorage.setItem("order", JSON.stringify(state.cartItems));
    }
  }, [state.cartItems.length]);

  useEffect(() => {
    if (currentCustomer.id !== undefined && state.cartItems.length === 0) {
      console.log(state.cartItems.length)
      api
        .get("/gamesOrder?UserName=" + currentCustomer.UserName)
        .then((res) => {
          if (res.data.length > 0) {
            setBuyedGames(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentCustomer,state.cartItems.length]);

  const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const newPopularGame = paginate(popularGame, 4, currentPage);

  const handleCheckout = () => {
    api
      .post("/gamesOrder", {
        UserName : currentCustomer.UserName,
        cartItems: cartItem,
        total: total,
        createdAt: new Date().toISOString(),
        status: "fulfilled",
      })
      .then((res) => {
        console.log(res);
        setCartActive(false);
        setTotal(0);
        CreateNotification("success","Thank you for your purchase","Checkout success")
        dispatch(actions.replaceCartItems([]));
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <React.Fragment>
      <NotificationContainer />
      <Grid container className="shopContainer">
        <Grid item xs={1}></Grid>
        <Grid item xs={10} className="poplarGameContainer">
          <div className="popularGameTitle">
            <div className="title">Popular game</div>
            <div className="more">View more</div>
          </div>
          <div className="popularGames">
            {newPopularGame.map((item, index) => (
              <PopularGame key={index} game={item} buyedGames={buyedGames} />
            ))}
          </div>
          <div
            className={
              popularGame.length <= 4
                ? "navigationGame disable"
                : "navigationGame"
            }
          >
            <Button
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
              className={currentPage === 1 ? "navLeft disable" : "navLeft "}
            >
              {" "}
              <ChevronLeftIcon />{" "}
            </Button>
            <Button
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
              className={
                currentPage < Math.ceil(popularGame.length / 4)
                  ? "navRight"
                  : "navRight disable"
              }
            >
              {" "}
              <ChevronRightIcon />{" "}
            </Button>
          </div>

          <div className="topGameDownloadedContainer">
            <div className="title">Top game downloaded</div>
            <TopGameDownloaded gameList={popularGame} />
          </div>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <div className="gameSlide">
        <div className="title">Recommend for you</div>
        {currentCustomer.UserName !== undefined ? (
          <GameSlide gameList={popularGame} buyedGames={buyedGames} />
        ) : (
          <React.Fragment>
            <div className="gameSlideSubTitle">
              Sign in to view personalized recommendations
            </div>
            <Button className="toSignIn">
              <Link to="/logIn">Sign in now</Link>
            </Button>
          </React.Fragment>
        )}
      </div>
      <div style={{ height: "100px" }}></div>
      <div style={{ width: "0px" }}>
        <Button
          onClick={() => {
            setCartActive(!cartActive);
          }}
          className={cartActive ? "cartBtn disable" : "cartBtn"}
        >
          <div className="totalItem">{total}</div>
          <ShoppingCartIcon />
        </Button>
      </div>
      <div
        className={
          cartActive
            ? "shoppingCartContainer cartActive"
            : "shoppingCartContainer cartDeactive "
        }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            position: "sticky",
            top: "0",
          }}
        >
          <Button
            onClick={() => {
              setCartActive(!cartActive);
            }}
            className="closeCart"
          >
            <ClearIcon />
          </Button>
        </div>

        <div className="cartTitle">
          <div className="title">
            <ShoppingCartIcon
              style={{
                height: "40px",
                width: "40px",
                marginRight: "10px",
                color: "#3ec2ae ",
              }}
            />{" "}
            Your cart
          </div>
          <div className="numberTotal">
            {total} {total > 1 ? "items" : "item"}
          </div>
        </div>
        {cartItem.length > 0 ? (
          cartItem.map((item, index) => <CartItem key={index} item={item} />)
        ) : (
          <div style={{ fontSize: "50px", fontWeight: "bold" }}></div>
        )}
        <div
          className={
            cartItem.length > 3 ? "checkOutBox sticky" : "checkOutBox absolute"
          }
          style={{}}
        >
          <Button
            onClick={() => {
              handleCheckout();
            }}
            className={
              cartItem.length > 0 ? "checkOutBtn" : "checkOutBtn disable"
            }
          >
            Check out
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Shop;
