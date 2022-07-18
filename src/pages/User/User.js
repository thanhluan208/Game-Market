import React, { useEffect, useState } from 'react'

import { Button, Grid } from '@mui/material'

import { useStore, } from '../../Store'

import "./User.css"

import UserBG1 from "../../Images/User/BG.jpg"
import UserBG2 from "../../Images/User/BG2.jpg"
import UserBG3 from "../../Images/User/BG3.jpg"

import Posts from "./UserPosts"
import Games from "./UserGames"
import Reviews from "./UserReview"



function User() {
  const [PostStat, setPostStat] = useState(0)
  const [GameStat, setGameStat] = useState(0)
  const [UpvoteStat, setUpvoteStat] = useState(0)
  const [background, setBackground] = useState(UserBG3)
  const [currentOption, setCurrentOption] = useState("Posts")


  const [state, ] = useStore()
  const customer = state.customer

  const Options = ["Posts", "Games", "Reviews"]
  useEffect(() => {
    setPostStat(Math.floor(Math.random() * 10))
    setGameStat(Math.floor(Math.random() * 10))
    setUpvoteStat(Math.floor(Math.random() * 4000 + 1000))
  }, [])

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
          <Button className='EditBtn'>Edit your profile</Button>
        </Grid>
        <Grid item xs={10} className="UserContent">
          <div className='UserGreeting'>Welcome , <span style={{color:"#3ec2ae"}}>{customer?.name}</span>       !</div>
          {currentOption === "Posts" && <Posts totalPosts={PostStat}/>}
          {currentOption === "Games" && <Games />}
          {currentOption === "Reviews" && <Reviews />}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default User