import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailIcon from "@mui/icons-material/Mail";
import GitHubIcon from "@mui/icons-material/GitHub";

import api from "../../api/api";
import { CreateNotification } from "../../Component/Notification";
import { useStore, actions } from "../../Store";

import userDefault from "../../Images/Log In/UserDefault.png";
import userBackground from "../../Images/User/BG3.jpg";

function SignIn({ accountStatus }) {
  const navigate = useNavigate();
  const [, dispatch] = useStore();
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
    orders:0,
    createdAt: new Date().toISOString(),
  });
  const [oldCustomer, setOldCustomer] = useState({
    UserName: "",
    password: "",
  });

  const makeLoginRequest = (resource, UserName, password) => {
    api
      .get(`${resource}?UserName=${UserName}&password=${password}`)
      .then((res) => {
        if (res.data.length > 0) {
          localStorage.setItem("user",JSON.stringify(res.data[0]))
          dispatch(actions.setCustomer(res.data[0]));
          navigate("/user");
        } else {
          CreateNotification(
            "error",
            "Wrong username or password",
            "Login failed"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeSignUpRequest = (resource, data) => {
    api.get(`${resource}?UserName=${data.UserName}`).then((res) => {
      if (res.data.length > 0) {
        CreateNotification("error", "User already exists", "Sign up failed");
      } else {
        api
          .post(`${resource}`, data)
          .then((res) => {
            CreateNotification("success", "Sign up success", "Sign up success");
            dispatch(actions.setCustomer(res.data));
            navigate("/user");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

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
      makeLoginRequest("users", oldCustomer.UserName, oldCustomer.password);
    }
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
    } else {
      makeSignUpRequest("users", newCustomer);
    }
  };



  return (
    <React.Fragment>
      <div
        className={
          accountStatus === "exist"
            ? "hiddenBackground hiddenRight"
            : "hiddenBackground hiddenLeft"
        }
      ></div>
      <div
        className={
          accountStatus === "exist"
            ? "logInTitle fromRight"
            : "logInTitle fromLeft"
        }
      >
        {accountStatus === "exist" ? "Sign In Your Account" : "Sign Up Now!"}
        <div className="span"></div>
      </div>

      {accountStatus === "exist" ? (
        <div className="mediaBox fromRight">
          <div className="media">
            <FacebookIcon className="mediaIcon" />
          </div>
          <div className="media">
            <MailIcon className="mediaIcon" />
          </div>
          <div className="media">
            <GitHubIcon className="mediaIcon" />
          </div>
        </div>
      ) : (
        ""
      )}
      {accountStatus === "notExist" ? (
        <React.Fragment>
          <div
            className={
              accountStatus === "exist"
                ? "FullName fromRight"
                : "FullName fromLeft"
            }
          >
            <div className="inputBox FirstName" style={{ paddingRight: "1%" }}>
              <TextField
                className="inputField"
                id="filled-search"
                label="First Name"
                name="first name"
                value={newCustomer["first name"]}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    "first name": e.target.value,
                  })
                }
                type="search"
                variant="filled"
              />
            </div>
            <div className="inputBox LastName" style={{ paddingLeft: "1%" }}>
              <TextField
                className="inputField"
                id="filled-search"
                label="Last Name"
                name="last name"
                value={newCustomer["last name"]}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    "last name": e.target.value,
                  })
                }
                type="search"
                variant="filled"
              />
            </div>
          </div>
          <div
            className={
              accountStatus === "exist"
                ? "inputBox Email fromRight"
                : "inputBox Email fromLeft"
            }
          >
            <TextField
              className="inputField"
              id="filled-search"
              label="title"
              type="search"
              name="title"
              value={newCustomer.title}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, title: e.target.value })
              }
              variant="filled"
            />
          </div>
        </React.Fragment>
      ) : (
        ""
      )}

      <div
        className={
          accountStatus === "exist"
            ? "inputBox UserName fromRight"
            : "inputBox UserName fromLeft"
        }
      >
        <TextField
          className="inputField"
          id="filled-search"
          label="Username"
          name="Username"
          value={
            accountStatus === "exist"
              ? oldCustomer.UserName
              : newCustomer.UserName
          }
          onChange={(e) => {
            accountStatus === "exist"
              ? setOldCustomer({ ...oldCustomer, UserName: e.target.value })
              : setNewCustomer({ ...newCustomer, UserName: e.target.value });
          }}
          type="search"
          variant="filled"
        />
      </div>
      <div
        className={
          accountStatus === "exist"
            ? "inputBox password fromRight"
            : "inputBox password fromLeft"
        }
      >
        <TextField
          className="inputField"
          id="filled-search"
          label="password"
          name="password"
          value={
            accountStatus === "exist"
              ? oldCustomer.password
              : newCustomer.password
          }
          onChange={(e) => {
            accountStatus === "exist"
              ? setOldCustomer({ ...oldCustomer, password: e.target.value })
              : setNewCustomer({ ...newCustomer, password: e.target.value });
          }}
          type="password"
          variant="filled"
          style={{ marginBottom: "20px" }}
        />
      </div>
      {accountStatus === "exist" ? (
        <div className="forgotPassword fromRight">Forgot your password ?</div>
      ) : (
        ""
      )}
      <Button
        onClick={accountStatus === "exist" ? handleSignIn : handleSignUp}
        className={
          accountStatus === "exist"
            ? "signInBtn fromRight"
            : "signInBtn fromLeft"
        }
      >
        {accountStatus === "exist" ? "Sign In" : "Sign Up"}
      </Button>
    </React.Fragment>
  );
}

export default SignIn;
