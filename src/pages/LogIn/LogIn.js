import React from 'react'

import { NotificationContainer } from 'react-notifications';

import { Button, Grid } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import SignIn from './SignIn'
import Switch from './Switch'

import "./LogIn.css"

function LogIn() {

  const [accountStatus, setAccountStatus] = React.useState("exist")

  return (
    <div className='logInContainer'>
      <NotificationContainer/>
      <div className='circle'></div>
      <div className='circle'></div>
      <Grid container className='logInBox'>
          {
              accountStatus === "exist" ?
                <React.Fragment>
                  <Grid item xs={6} className='logIn logInRight'><SignIn accountStatus={accountStatus}/></Grid>
                  <Grid item xs={6}  className="switchContainer switchLeft"><Switch accountStatus={accountStatus}/></Grid>
                </React.Fragment> :
                <React.Fragment>
                  <Grid item xs={6} className="switchContainer switchRight"><Switch accountStatus={accountStatus}/></Grid>
                  <Grid item xs={6} className='logIn logInLeft'><SignIn accountStatus={accountStatus}/></Grid>
                </React.Fragment>
          }
          <Button className={accountStatus === "exist" ? "switchBtn rotate" : "switchBtn"} onClick={() => setAccountStatus(accountStatus === "exist" ? "notExist" : "exist")}><ArrowBackIosIcon/></Button>
      </Grid>
    </div>
  )
}

export default LogIn