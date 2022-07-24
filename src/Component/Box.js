import React from 'react'

import { Grid } from '@mui/material'

import './box.css'

function Box() {
  return (
    <div className='superBox' style={{overflow:"hidden",display:"flex",justifyContent:"center"}}>
      <div className="boxContainer">
        <div className='bigBox box1'>
          <div className='box'></div>
          <div className='box'></div>
        </div>
        <div className='bigBox box2'>
          <div className='box'></div>
          <div className='box'></div>
        </div>
        <div className='bigBox box3'>
          <div className='box'></div>
          <div className='box'></div>
        </div>
        <div className='bigBox box4'>
          <div className='box'></div>
          <div className='box'></div>
        </div>
        <div className='bigBox box5'>
          <div className='box'></div>
          <div className='box'></div>
          <div className='box'></div>
          <div className='box'></div>
        </div>
        <div className='bigBox box6'>
          <div className='box'></div>
          <div className='box'></div>
        </div>
        <div className='bigBox box7'>
          <div className='box'></div>
          <div className='box'></div>
        </div>
        <div className='bigBox box8'>
          <div className='box'></div>
          <div className='box'></div>
        </div>
        <div className='bigBox box9'>
          <div className='box'></div>
          <div className='box'></div>
        </div>
        
      </div>
    </div>
  )
}

export default Box