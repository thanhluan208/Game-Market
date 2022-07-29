import React, { useState } from 'react'
import { Button, Grid } from '@mui/material'

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArticleIcon from '@mui/icons-material/Article';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ReviewsIcon from '@mui/icons-material/Reviews';
import NewspaperIcon from '@mui/icons-material/Newspaper';

import Accounts from './Accounts'
import Boxes from '../../Component/Box'
import Posts from './Posts'
import Orders from './Orders'
import Reviews from './Reviews'
import News from './News'
import { NotificationContainer } from 'react-notifications';



import "./Admin.css";

function Admin() {

  const [activeTab, setActiveTab] = useState("accounts")
  

  return (
    <Grid container style={{height:"90vh"}}>
      <NotificationContainer/>
      <Grid item xs={2} className="sidebarContainer">
        <div className={"sidebarBox"}>
          <Button onClick={() => setActiveTab("accounts")} className={activeTab === "accounts" ? "adminTab activeTab" : "adminTab"}>
            <AccountBoxIcon/>
            <div className={activeTab === "accounts" ? "adminTabContent activeTabContent" : "adminTabContent"}> Users </div>
          </Button>
          <Button onClick={() => setActiveTab("posts")} className={activeTab === "posts" ? "adminTab activeTab" : "adminTab"}>
            <ArticleIcon/>
            <div className={activeTab === "posts" ? "adminTabContent activeTabContent" : "adminTabContent"}> Posts </div>
          </Button>
          <Button onClick={() => setActiveTab("orders")} className={activeTab === "orders" ? "adminTab activeTab" : "adminTab"}>
            <ShoppingBasketIcon/>
            <div className={activeTab === "orders" ? "adminTabContent activeTabContent" : "adminTabContent"}> Orders </div>
          </Button>
          <Button onClick={() => setActiveTab("reviews")} className={activeTab === "reviews" ? "adminTab activeTab" : "adminTab"}>
            <ReviewsIcon/>
            <div className={activeTab === "reviews" ? "adminTabContent activeTabContent" : "adminTabContent"}> Reviews </div>
          </Button>
          <Button onClick={() => setActiveTab("news")} className={activeTab === "news" ? "adminTab activeTab" : "adminTab"}>
            <NewspaperIcon/>
            <div className={activeTab === "news" ? "adminTabContent activeTabContent" : "adminTabContent"}> News </div>
          </Button>
        </div>
      </Grid>
      <Grid item xs={10} style={{padding:"0 2%"}}>
        {activeTab === "accounts" && <Accounts />}
        {activeTab === "posts" && <Posts/>}
        {activeTab === "orders" && <Boxes/>}
        {activeTab === "reviews" && <Boxes/>}
        {activeTab === "news" && <Boxes/>}
      </Grid>
    </Grid>
  )
}

export default Admin