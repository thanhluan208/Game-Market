import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { CreateNotification } from "../../Component/Notification";

import api from "../../api/api";

import { Button, Grid, TextField } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailIcon from "@mui/icons-material/Mail";
import GitHubIcon from "@mui/icons-material/GitHub";

import SignIn from "./SignIn";
import Switch from "./Switch";
import { useStore, actions } from "../../Store";

import userDefault from "../../Images/Log In/UserDefault.png";
import userBackground from "../../Images/User/BG3.jpg";

import "./LogIn.css";

function LogIn() {
  const [, dispatch] = useStore();
  const [accountStatus, setAccountStatus] = useState("exist");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldCustomer, setOldCustomer] = useState({
    UserName: "",
    password: "",
  });
  const [newCustomer, setNewCustomer] = useState({
    "first name": "",
    "last name": "",
    UserName: "",
    avatar: userDefault,
    password: "",
    backgroundProfile: userBackground,
    title: "user",
    subtitle: "",
    games: [],
    orders: 0,
    createdAt: new Date().toISOString(),
  });

  const navigate = useNavigate();

  const handleSignIn = () => {
    if (oldCustomer.UserName === "") {
      CreateNotification(
        "error",
        "Please enter your username",
        "Log In failed"
      );
    } else if (oldCustomer.password === "") {
      CreateNotification(
        "error",
        "Please enter your password",
        "Log In failed"
      );
    } else {
      api
        .get(
          `/users?UserName=${oldCustomer.UserName}&password=${oldCustomer.password}`
        )
        .then((res) => {
          if (res.data.length > 0) {
            localStorage.setItem("user", JSON.stringify(res.data[0]));
            dispatch(actions.setCustomer(res.data[0]));
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(oldCustomer);
  };

  const handleSignUp = () => {
    if (newCustomer["first name"] === "") {
      CreateNotification(
        "error",
        "Please enter your first name",
        "Sign Up failed"
      );
    } else if (newCustomer["last name"] === "") {
      CreateNotification(
        "error",
        "Please enter your last name",
        "Sign Up failed"
      );
    } else if (newCustomer.UserName === "") {
      CreateNotification(
        "error",
        "Please enter your username",
        "Sign Up failed"
      );
    } else if (newCustomer.password === "") {
      CreateNotification(
        "error",
        "Please enter your password",
        "Sign Up failed"
      );
    } else if (newCustomer.password !== confirmPassword) {
      CreateNotification(
        "error",
        "Your password and confirmpassword are not the same",
        "Sign Up failed"
      );
    } else {
      api
        .get(`/users?UserName=${newCustomer.UserName}`)
        .then((res) => {
          if (res.data.length > 0) {
            CreateNotification(
              "error",
              "User already exists",
              "Sign Up failed"
            );
          } else {
            api
              .post("/users", newCustomer)
              .then((res) => {
                CreateNotification(
                  "success",
                  "Sign Up success",
                  "Sign Up success"
                );
                localStorage.setItem('user',JSON.stringify(res.data));
                dispatch(actions.setCustomer(res.data));
                localStorage.setItem("page", JSON.stringify(""));
                navigate("/");
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div className="logInContainer">
      <NotificationContainer />
      <div className="circle"></div>
      <div className="circle"></div>
      <Grid container className="logInBox">
        {accountStatus === "exist" ? (
          <React.Fragment>
            <Grid item xs={6} className="logIn logInRight">
              <SignIn accountStatus={accountStatus} />
            </Grid>
            <Grid item xs={6} className="switchContainer switchLeft">
              <Switch accountStatus={accountStatus} />
            </Grid>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Grid item xs={6} className="switchContainer switchRight">
              <Switch accountStatus={accountStatus} />
            </Grid>
            <Grid item xs={6} className="logIn logInLeft">
              <SignIn accountStatus={accountStatus} />
            </Grid>
          </React.Fragment>
        )}
        <Button
          className={
            accountStatus === "exist" ? "switchBtn rotate" : "switchBtn"
          }
          onClick={() =>
            setAccountStatus(accountStatus === "exist" ? "notExist" : "exist")
          }
        >
          <ArrowBackIosIcon />
        </Button>
      </Grid>
      <div className={accountStatus === "exist" ? "signInTablet" : "disable"}>
        <div className="signInTabletHeader">Log In</div>
        <TextField
          className="signInTabletInput"
          id="outlined-basic"
          label="UserName"
          variant="outlined"
          name="UserName"
          value={oldCustomer.UserName}
          onChange={(e) =>
            setOldCustomer({ ...oldCustomer, UserName: e.target.value })
          }
        />
        <TextField
          className="signInTabletInput"
          id="outlined-basic"
          label="password"
          type="password"
          variant="outlined"
          name="password"
          value={oldCustomer.password}
          onChange={(e) =>
            setOldCustomer({ ...oldCustomer, password: e.target.value })
          }
        />
        <div className="signInTabletText"> Forgot your password ?</div>
        <Button onClick={() => handleSignIn()} className="signInTabletBtn">
          Log In
        </Button>
        <div
          style={{ textAlign: "center", marginTop: "15%" }}
          className="signInTabletText"
        >
          Or sign in with
        </div>
        <div className="signInMedia">
          <Button className="signInMediabtn">
            <FacebookIcon />
          </Button>
          <Button className="signInMediabtn">
            <MailIcon />
          </Button>
          <Button className="signInMediabtn">
            <GitHubIcon />
          </Button>
        </div>
        <div className="signInSwitch">
          <div className="signInSwitchText">Don't have an account ?</div>
          <Button
            onClick={() => setAccountStatus("notExist")}
            className="signInSwitchBtn"
          >
            Sign Up
          </Button>
        </div>
      </div>
      <div
        className={accountStatus === "notExist" ? "signUpTablet" : "disable"}
      >
        <div className="signUpTabletHeader">Sign Up</div>
        <div className="signUpTabletName">
          <TextField
            style={{ marginRight: "10%" }}
            className="signUpTabletNameInput"
            id="outlined-basic"
            label="first name"
            variant="outlined"
            name="first name"
            value={newCustomer["first name"]}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, "first name": e.target.value })
            }
          />
          <TextField
            className="signUpTabletNameInput"
            id="outlined-basic"
            label="last name"
            variant="outlined"
            name="last name"
            value={newCustomer["last name"]}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, "last name": e.target.value })
            }
          />
        </div>
        <TextField
            className="signUpTabletInput"
            id="outlined-basic"
            label="UserName"
            variant="outlined"
            name="UserName"
            value={newCustomer.UserName}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, UserName: e.target.value })
            }
          />
        <TextField
            className="signUpTabletInput"
            id="outlined-basic"
            label="password"
            variant="outlined"
            name="password"
            type="password"
            value={newCustomer.password}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, password: e.target.value })
            }
          />
        <TextField
            className="signUpTabletInput"
            id="outlined-basic"
            label="confirm password"
            variant="outlined"
            name="confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
         <Button onClick={() => handleSignUp()} className="signUpTabletbtn">Sign Up</Button> 
        <div className="signUpTabletSwitch">
          <div className="signUpTabletSwitchText">Already have an account ?</div>
          <Button
            onClick={() => setAccountStatus("exist")}
            className="signUpTabletSwitchBtn"
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
