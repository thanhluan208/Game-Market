import React, { useEffect, useState } from 'react'

import { Button, Grid } from '@mui/material'

import { useStore, } from '../../Store'

import "./User.css"



import Posts from "./UserPosts"
import Games from "./UserGames"
import Reviews from "./UserReview"
import EditProfile from './EditProfile'



function User() {
  const [state, ] = useStore()
  const customer = state.customer

  const [PostStat,] = useState(customer.posts.length)
  const [GameStat, setGameStat] = useState(0)
  const [UpvoteStat, setUpvoteStat] = useState(0)
  const [background,setBackground] = useState(customer.backgroundProfile)
  const [currentOption, setCurrentOption] = useState("Posts")


  

  const Options = ["Posts", "Games", "Reviews"]
  useEffect(() => {
    setGameStat(Math.floor(Math.random() * 10))
    setUpvoteStat(Math.floor(Math.random() * 4000 + 1000))
  }, [])

  useEffect(() => {
    setBackground(customer.backgroundProfile)
  },[customer])

  return (
    <React.Fragment>
      <div className='UserBG' style={{backgroundImage:`url(${background})`}}></div>
      <Grid container className='UserContainer'>
        <Grid item xs={2}className="UserInfo" >
          <div className='UserAvatar' style={{background:`url(${customer.avatar})`}}></div>
          <div className='UserName'>{customer.name}</div>
          <div className='UserTitle'>
            {customer.title}
          </div>
          <div className='UserStatBox'>
            <div className="Stat">
              {PostStat}
              <div>{PostStat > 1 ? "Posts" : "Post"}</div>
            </div>
            <div className="Stat">
              {GameStat}
              <div>{GameStat > 1 ? "Games" : "Game"}</div>
            </div>
            <div className="Stat">
              {UpvoteStat}
              <div>Upvotes</div>  
            </div>
          </div>
          <hr></hr>
          <div className='optionBox'>
            {Options.map(option => {
              if(currentOption === option) {
                return(
                  <Button className='optionBtn currentOption' key={option} onClick={() => setCurrentOption(option)}>
                    <div className='leftBtn'></div>
                    {option}
                    <div className='rightBtn'></div>
                  </Button>
                )
              }
              else {
                return(
                  <Button className='optionBtn' key={option} onClick={() => setCurrentOption(option)}>{option}</Button>
                )
              }
            }
            )}
          </div>
          <EditProfile/>
        </Grid>
        <Grid item xs={10} className="UserContent">
          <div className='UserGreeting'>Welcome , <span style={{color:"#3ec2ae"}}>{customer?.name}</span>!</div>
          {currentOption === "Posts" && <Posts totalPosts={PostStat}/>}
          {currentOption === "Games" && <Games />}
          {currentOption === "Reviews" && <Reviews />}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default User