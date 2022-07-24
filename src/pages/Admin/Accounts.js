import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import { Button, Grid } from "@mui/material";

import api from "../../api/api";

import Account from "./Account";

function Accounts() {
  const [sortBy, setSortBy] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);

  const [maxPage, setMaxPage] = useState(0);

  const [searchVal, setSearchVal] = useState("");

  const [userList, setUserList] = useState([]);

  const sortList = ["id", "UserName", "title"];

  const start = currentPage*5-5;
  const end = currentPage*5;

 

  useEffect(() => {
    api
    .get(`/users?_sort=${sortBy}&q=${searchVal}&_start=${start}&_end=${end}`)
    .then((res) => {
      setUserList(res.data);
      if(res.headers["x-total-count"] === 0){
        setMaxPage(0)
      }
      else{
      setMaxPage(Math.ceil(res.headers["x-total-count"] / 5))
      }
    });
  }, [searchVal,currentPage,sortBy])




  return (
    <React.Fragment>
      <div className="Controller">
        <TextField
          id="outlined-select-currency"
          select
          className="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {sortList.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <div className="pagination">
          <Button onClick={() => setCurrentPage(currentPage - 1)} className={currentPage === 1 ? "disable" : "pageDown"}>
            <WestIcon />
          </Button>
          <div className="pageContent">{"Page " + currentPage}</div>
          <Button onClick={() => setCurrentPage(currentPage + 1)} className={currentPage === maxPage  || maxPage === 0 ? "disable" : "pageUp"}>
            <EastIcon />
          </Button>
        </div>
        <TextField
          id="outlined-textarea"
          label="Search box"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="searchBox"
        />
      </div>
      <Grid container className="AccountsList">
        <Grid item xs={1} className="listHeader">
          User_Id
        </Grid>
        <Grid item xs={3} className="listHeader">
          UserName
        </Grid>
        <Grid item xs={2} className="listHeader">
          User_Password
        </Grid>
        <Grid item xs={2} className="listHeader">
          User_Title
        </Grid>
        <Grid item xs={1} className="listHeader">
          Order
        </Grid>
      </Grid>
      {userList.map((user) => (
        <Account account={user} key={user.id} />
      ))}
    </React.Fragment>
  );
}

export default Accounts;
