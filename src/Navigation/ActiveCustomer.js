import React from "react";

import { Link } from "react-router-dom";

import { useStore, actions } from "../Store";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LogoutIcon from '@mui/icons-material/Logout';

function ActiveCustomer({ customer }) {
  const [open, setOpen] = React.useState(false);
  const [, dispatch] = useStore();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logOut = () => {
    setOpen(false);
    dispatch(actions.removeCustomer());
    dispatch(actions.removeCartItems([]));
  }


  return (
    <Link className="customer" to="/logIn">
      <div className="customerAva" style={{ background: `url(${customer.avatar})` }}></div>
      <span className="customerName">{customer.name}</span>
      <Button className="logOut" variant="outlined" onClick={handleClickOpen}> <LogoutIcon/> </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you really want to logout?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={logOut} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Link>
  );
}

export default ActiveCustomer;
