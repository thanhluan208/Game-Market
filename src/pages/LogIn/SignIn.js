import React, { useState } from "react";

import { TextField, Button } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';

import customerAva from "../../Images/Customer/customerAva1.jpg"

import { CreateNotification } from "../../Component/Notification";

import { useStore, actions } from '../../Store'


function SignIn({accountStatus}) {

    const [, dispatch] = useStore()
    const [ newCustomer, setNewCustomer] = useState({FirstName: "",LastName:"",Email:"",UserName:"",Password:""})
    const [ oldCustomer, setOldCustomer] = useState({UserName:"",Password:""})

    const Customer = {
        name : oldCustomer.UserName,
        avatar:customerAva,
        status:"active"
      }

    
    const handleSignIn = () => {
      console.log(oldCustomer)
      if(oldCustomer.UserName === "") {
        CreateNotification("error","Please enter your username",'Log In failed')
      }
      dispatch(actions.setCustomer(Customer))
    }

    const handleSignUp = () => {
      console.log(newCustomer)
      if(newCustomer.UserName === "") {
        CreateNotification("error","Please enter your username",'Sign Up failed')
      }
      dispatch(actions.setCustomer(Customer))
    }
    
  return (
    <React.Fragment>
    <div className={accountStatus === "exist" ? "hiddenBackground hiddenRight" : "hiddenBackground hiddenLeft"}></div>
      <div className={accountStatus === "exist" ? "logInTitle fromRight" : "logInTitle fromLeft"}>
        {accountStatus === "exist" ? "Sign In Your Account" : "Sign Up Now!"}
        <div className="span"></div>
      </div>

        {
            accountStatus === "exist" ?
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
            : ""

                
        }
        {
            accountStatus === "notExist" ?
            <React.Fragment>
                <div className={accountStatus === "exist" ? "FullName fromRight" : "FullName fromLeft"}>
                    <div className="inputBox FirstName" style={{paddingRight:"1%"}}>
                        <TextField
                            className="inputField"
                            id="filled-search"
                            label="First Name"
                            name = "FirstName"
                            value = {newCustomer.FirstName}
                            onChange = {(e) => setNewCustomer({...newCustomer,FirstName:e.target.value})}
                            type="search"
                            variant="filled"
                        />
                    </div>
                    <div className="inputBox LastName" style={{paddingLeft:"1%"}}>
                        <TextField
                        className="inputField"
                        id="filled-search"
                        label="Last Name"
                        name = "LastName"
                        value={newCustomer.LastName}
                        onChange = {(e) => setNewCustomer({...newCustomer,LastName:e.target.value})}
                        type="search"
                        variant="filled"
                        />
                    </div>
                </div> 
                <div className={accountStatus === "exist" ? "inputBox Email fromRight" : "inputBox Email fromLeft"}>
                    <TextField
                    className="inputField"
                    id="filled-search"
                    label="Email"
                    type="search"
                    name = "Email"
                    value = {newCustomer.Email}
                    onChange = {(e) => setNewCustomer({...newCustomer, Email:e.target.value})}
                    variant="filled"
                    />
                </div>
            </React.Fragment>
            : ""
        }

      <div className={accountStatus === "exist" ? "inputBox UserName fromRight" : "inputBox UserName fromLeft"}>
        <TextField
          className="inputField"
          id="filled-search"
          label="Username"
          name = "Username"
          value = {accountStatus === "exist" ? oldCustomer.UserName : newCustomer.UserName}
          onChange = {(e) => {
            accountStatus === "exist" ? setOldCustomer({...oldCustomer,UserName:e.target.value}) : setNewCustomer({...newCustomer, UserName:e.target.value})
          }}
          type="search"
          variant="filled"
        />
      </div>
      <div className={accountStatus === "exist" ? "inputBox Password fromRight" : "inputBox Password fromLeft"}>
        <TextField
          className="inputField"
          id="filled-search"
          label="Password"
          name = "Password"
          value = {accountStatus === "exist" ? oldCustomer.Password : newCustomer.Password}
          onChange = {(e) => {
            accountStatus === "exist" ? setOldCustomer({...oldCustomer,Password:e.target.value}) : setNewCustomer({...newCustomer,Password:e.target.value})
          }}
          type="password"
          variant="filled"
          style={{marginBottom: "20px"}}
        />
      </div>
      { accountStatus === "exist" ? <div className="forgotPassword fromRight">Forgot your password ?</div> : "" }
        <Button onClick={accountStatus === "exist" ? handleSignIn : handleSignUp}  className={accountStatus === "exist" ? "signInBtn fromRight" : "signInBtn fromLeft"}>
            {accountStatus === "exist" ? "Sign In" : "Sign Up"}
        </Button>
    </React.Fragment>
  );
}

export default SignIn;
