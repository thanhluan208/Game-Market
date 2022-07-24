import React from 'react'

import ClearIcon from '@mui/icons-material/Clear';
import { Button } from '@mui/material';

import { useStore, actions } from '../../../Store'

function CartItem({item}) {


    const [state, dispatch] = useStore()

    const currentCart = state.cartItems


    const removeItem = () => {
      currentCart.splice(currentCart[item.id], 1)
      dispatch(actions.replaceCartItems(currentCart))
    }

    return (
    <div className='cartItemContainer'>
      <div className='cartItemImg' style={{background:`url(${item.imgURL})`}}></div>
      <div className='cartInfo'>{item.name}</div>
      <div className="cartItemPrice">${item.price}</div>
      <Button onClick={() => {removeItem()}} className="cartItemRemove">
        <ClearIcon/>
      </Button>
    </div>
  )
}

export default CartItem