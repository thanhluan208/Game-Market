import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import UserBG1 from "../../Images/User/BG.jpg";
import UserBG2 from "../../Images/User/BG2.jpg";
import UserBG3 from "../../Images/User/BG3.jpg";
import { Box } from "@mui/material";

import { useStore,actions } from "../../Store";
import api from "../../api/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function EditProfile() {
  const [state,dispatch] = useStore();

  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(state.customer);
  const [newCustomerName, setNewCustomerName] = useState(customer.UserName);
  const [newCustomerTitle, setNewCustomerTitle] = useState(customer.title);
  const [newCustomerSubtitle, setNewCustomerSubtitle] = useState(
    customer.subtitle
  );
  const [newCustomerBackground, setNewCustomerBackground] = useState(
    customer.backgroundProfile
  );

  const listBG = [UserBG1, UserBG2, UserBG3];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const makePatchRequets = (resource, userID) => {
    api
      .patch("/" + resource + "/" + userID, {
        UserName: newCustomerName,
        title: newCustomerTitle,
        subtitle: newCustomerSubtitle,
        backgroundProfile: newCustomerBackground,
      })
      .then((res) => {
        dispatch(actions.setCustomer(res.data));
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    makePatchRequets("users", customer.id);
  };


  useEffect(() => {
    setCustomer(state.customer);
  }, [state]);

  return (
    <div>
      <Button className="EditBtn" variant="outlined" onClick={handleClickOpen}>
        Edit your profile
      </Button>
      <Dialog
        maxWidth="80vw"
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        className="editContainer"
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit your profile
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box className="editBox">
          <TextField
            className="editInput"
            id="outlined-basic"
            label="Your new name"
            defaultValue={newCustomerName}
            variant="outlined"
            onChange={(e) => setNewCustomerName(e.target.value)}
          />
          <TextField
            className="editInput"
            id="outlined-basic"
            label="Your new title"
            defaultValue={newCustomerTitle}
            variant="outlined"
            onChange={(e) => setNewCustomerTitle(e.target.value)}
          />
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue={newCustomerSubtitle}
            className="editSubtitle"
            variant="outlined"
            onChange={(e) => setNewCustomerSubtitle(e.target.value)}
          />
          <div className="editBackgroundContainer">
            <div className="editBackgroundTitle" style={{fontSize:"1.5rem"}}>Change your background</div>
            <div className="editBackgroundBox">
              {listBG.map((bg, index) => {
                return (
                  <Button
                    key={index}
                    onClick={() => setNewCustomerBackground(bg)}
                    className="editBackground"
                    style={{ background: `url(${bg})` }}
                  ></Button>
                );
              })}
            </div>
          </div>
        </Box>
      </Dialog>
    </div>
  );
}

export default EditProfile;
