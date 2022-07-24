import React from "react";

import { Link,useNavigate } from "react-router-dom";

import { useStore, actions } from "../Store";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LogoutIcon from '@mui/icons-material/Logout';

function ActiveCustomer() {
  const [open, setOpen] = React.useState(false);
  const [state, dispatch] = useStore();
  const customer = state.customer
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logOut = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("order")
    setOpen(false);
    dispatch(actions.removeCustomer());
    dispatch(actions.replaceCartItems([]));
    navigate("/");
  }

  


  return (
    <div className="customer" >
      <Link onClick={ () => {dispatch(actions.setCurrentPage('admin'))}} to="/user" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div className="customerAva" style={{ background: `url(${customer.avatar})` }}></div>
        <span className="customerName">{customer.UserName}</span>
      </Link>
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
    </div>
  );
}

export default ActiveCustomer;
