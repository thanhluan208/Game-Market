
// Import Library
import Grid from '@mui/material/Grid'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useStore } from '../Store'



import ActiveCustomer from './ActiveCustomer'

import "./Navigation.css"

function Nav() {

  
  const [currentPage, setCurrentPage ] = useState('home')
  const [state,] = useStore()

  const currentCustomer = state.customer


  return (
    <Grid container style={{height:"10vh",position:"relative"}}>
        <Grid item xs={2} className="brandName">
          <Link onClick={ () => setCurrentPage("home") } to="/">aws<span id="Brand">Games</span></Link>
        </Grid>
        <Grid item xs={8} className="tabContainer">
          <Link onClick={ () => setCurrentPage("home")} className={currentPage === 'home' ? 'pageActive tab' : 'tab'}  to="/">Home</Link>
          <Link onClick={ () => setCurrentPage("shop")} className={currentPage === 'shop' ? 'pageActive tab' : 'tab'} to="/Shop">Store</Link>
          <Link onClick={ () => setCurrentPage("blog")} className={currentPage === 'blog' ? 'pageActive tab' : 'tab'} to="/Blog">Blog</Link>
          <Link onClick={ () => setCurrentPage("review")} className={currentPage === 'review' ? 'pageActive tab' : 'tab'} to="/Review">Review</Link>
          <Link onClick={ () => setCurrentPage("about")} className={currentPage === 'about' ? 'pageActive tab' : 'tab'} to="/About">About</Link>
          {currentCustomer.name.toLowerCase() === 'admin' ? <Link onClick={ () => setCurrentPage("admin")} className={currentPage === 'admin' ? 'pageActive tab' : 'tab'} to="/admin">Admin</Link> : null}
        </Grid>
        <Grid item xs={2} className="logContainer">
          {currentCustomer?.status === "nonActive" ? 
            <Link onClick={() => setCurrentPage("")}  className='logIn' to="/logIn">
              Log In/Sign Up
            </Link> 
            : 
            <ActiveCustomer  customer={currentCustomer}/>
          }
        </Grid>
    </Grid>
  )
}

export default Nav