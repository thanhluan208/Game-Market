
// Import Library
import Grid from '@mui/material/Grid'
import React from 'react'
import { Link } from 'react-router-dom'

import { useStore, actions } from '../Store'



import ActiveCustomer from './ActiveCustomer'

import "./Navigation.css"

function Nav() {

  

  const [state, dispatch] = useStore()

  const currentCustomer = state.customer


  return (
    <Grid container style={{height:"10vh",position:"relative"}}>
        <Grid item xs={2} className="brandName">
          <Link onClick={ () => {dispatch(actions.setCurrentPage('home'))}} to="/">aws<span id="Brand">Games</span></Link>
        </Grid>
        <Grid item xs={8} className="tabContainer">
          <Link onClick={ () => {dispatch(actions.setCurrentPage('home'))}} className={state.currentPage === 'home' ? 'pageActive tab' : 'tab'}  to="/">Home</Link>
          <Link onClick={ () => {dispatch(actions.setCurrentPage('shop'))}} className={state.currentPage === 'shop' ? 'pageActive tab' : 'tab'} to="/Shop">Store</Link>
          <Link onClick={ () => {dispatch(actions.setCurrentPage('blog'))}} className={state.currentPage === 'blog' ? 'pageActive tab' : 'tab'} to="/Blog">Blog</Link>
          <Link onClick={ () => {dispatch(actions.setCurrentPage('review'))}} className={state.currentPage === 'review' ? 'pageActive tab' : 'tab'} to="/Review">Review</Link>
          <Link onClick={ () => {dispatch(actions.setCurrentPage('about'))}} className={state.currentPage === 'about' ? 'pageActive tab' : 'tab'} to="/About">About</Link>
          {currentCustomer.name.toLowerCase() === 'admin' ? <Link onClick={ () => {dispatch(actions.setCurrentPage('admin'))}} className={state.currentPage === 'admin' ? 'pageActive tab' : 'tab'} to="/admin">Admin</Link> : null}
        </Grid>
        <Grid item xs={2} className="logContainer">
          {currentCustomer?.status === "nonActive" ? 
            <Link  className='logIn' to="/logIn">
              Log In/Sign Up
            </Link> 
            : 
            <ActiveCustomer customer={currentCustomer}/>
          }
        </Grid>
    </Grid>
  )
}

export default Nav