
// Import Library
import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

import { useStore,actions } from '../Store'



import ActiveCustomer from './ActiveCustomer'

import "./Navigation.css"

function Nav() {

  const navigate = useNavigate()
  const [currentPage, setCurrentPage ] = useState('')
  const [state,dispatch] = useStore()

  const currentCustomer = state.customer
  const currentCart = state.cartItems

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user) {
      dispatch(actions.setCustomer(user))
    }
  },[])

  useEffect(() => {
    const page = JSON.parse(localStorage.getItem("page"))
    if(page) {
      navigate("/" + page)
      setCurrentPage(page)
    }
  },[])

  useEffect(() => {
    localStorage.setItem("page",JSON.stringify(currentPage))
  },[currentPage])

  return (
    <Grid container style={{height:"10vh",position:"relative"}}>
        <Grid item xs={2} className="brandName">
          <Link onClick={ () => setCurrentPage("home") } to="/"><span id="Brand">Games</span>portal</Link>
        </Grid>
        <Grid item xs={8} className="tabContainer">
          <Link onClick={ () => setCurrentPage("")} className={currentPage === '' ? 'pageActive tab' : 'tab'}  to="/">Home</Link>
          <Link onClick={ () => setCurrentPage("shop")} className={currentPage === 'shop' ? 'pageActive tab' : 'tab'} to="/Shop">Store</Link>
          <Link onClick={ () => setCurrentPage("blog")} className={currentPage === 'blog' ? 'pageActive tab' : 'tab'} to="/Blog">Blog</Link>
          <Link onClick={ () => setCurrentPage("review")} className={currentPage === 'review' ? 'pageActive tab' : 'tab'} to="/Review">Review</Link>
          <Link onClick={ () => setCurrentPage("about")} className={currentPage === 'about' ? 'pageActive tab' : 'tab'} to="/About">About</Link>
          {currentCustomer.UserName === "Thanh Luan" ? <Link onClick={ () => setCurrentPage("admin")} className={currentPage === 'admin' ? 'pageActive tab' : 'tab'} to="/admin">Admin</Link> : null}
        </Grid>
        <Grid item xs={2} className="logContainer">
          {currentCustomer?.UserName === undefined ? 
            <Link onClick={() => setCurrentPage("login")}  className='logIn' to="/logIn">
              Log In/Sign Up
            </Link> 
            : 
            <ActiveCustomer/>
          }
        </Grid>
    </Grid>
  )
}

export default Nav