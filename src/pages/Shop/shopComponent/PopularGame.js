import React from 'react'

import { Button } from '@mui/material'

import {useStore, actions} from '../../../Store'
import { NotificationContainer } from 'react-notifications';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


import { CreateNotification } from '../../../Component/Notification';


function PopularGame({game}) {

    const[state, dispatch] = useStore()

    const currentCustomer = state.customer

    

    const addToCart = (item) => {
        currentCustomer.status === "active" ? 
            dispatch(actions.setCartItems(item)) 
        :
            CreateNotification("error","Please log in to buy this item","Buy failed")
    }

  return (
    <div className='gameContainer' >
        <div className='gameImgBox' style={{background:`url(${game.imgURL})`}}>
            <Button onClick={() => {addToCart(game)}} className='addGame'> <AddShoppingCartIcon style={{width:"50px",height:"50px"}}/> </Button>
        </div>
        <div className='gameInfo'>
            <div className='gameName'>{game.name}</div>
            <div className='gamePrice'>${game.price}</div>
        </div>
        <NotificationContainer/>
    </div>
  )
}

export default PopularGame