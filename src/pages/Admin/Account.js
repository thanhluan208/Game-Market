import React, { useState } from "react";

import { Grid, Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import api from "../../api/api";
import { CreateNotification } from "../../Component/Notification";

function Account({ account }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false)

  const removeUser = () => {
    setOpen(false);
    if (account.title.toLowerCase() === "admin") {
      CreateNotification("error", "You can't remove admin", "Remove failed");
    } else {
      CreateNotification(
        "success",
        "User removed",
        "User removed successfully"
      );
    }
  };

  return (
    <React.Fragment>
      <Grid onClick={() => setSelected(!selected)} container className={selected ? "account selected" : "account"}>
        <Grid item xs={2} className="accountInfo">
          {account.id}
        </Grid>
        <Grid item xs={2} className="accountInfo">
          {account.UserName}
        </Grid>
        <Grid item xs={2} className="accountInfo">
          {account.password}
        </Grid>
        <Grid item xs={2} className="accountInfo">
          {account.title}
        </Grid>
        <Grid item xs={1} className="accountInfo">
          {account.orders}
        </Grid>
        <Grid item xs={3} className="listUlti">
          <Button className="accountUpdate">Update profile</Button>
          <Button onClick={() => setOpen(true)} className="accountDelete">
            <DeleteForeverIcon />
          </Button>
        </Grid>
      </Grid>
      <div className={open ? "modalAlert" : "disable"}>
        <div className="modalContent">
          <h3>
            Are you sure you want to delete
            <span style={{ color: "rgb(62 194 174)" }}>
              {" "}
              {account.UserName}
            </span>
            's account ?
          </h3>
          <Button onClick={() => setOpen(false)} className="modalButton">
            No
          </Button>
          <Button onClick={() => removeUser()} className="modalButton">
            Yes
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Account;
