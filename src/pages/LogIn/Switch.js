import React from 'react'

import signUpImg from '../../Images/Log In/login.png'
import signInImg from '../../Images/Log In/logout.png'

function Switch({accountStatus}) {


    const accountExist = {
        title:"Hello, Friend!",
        subtitle:"Let's start your journey with us!",
        img: signUpImg
    }

    const accountNotExist = {
        title:"Welcome back!",
        subtitle:"Please sign in to continue your journey with us!",
        img: signInImg
    }

  return (
    <React.Fragment >
        <div className={accountStatus === "exist" ? "hiddenBackground hiddenSwitchLeft" : "hiddenBackground hiddenSwitchRight"}></div>
        <div className='switchTitle'>
            {accountStatus === "exist" ? accountExist.title : accountNotExist.title}
        </div>
        <div className='switchImgBox'>
            <div className='switchImg' style={{background:`url(${accountStatus === "exist" ? accountExist.img : accountNotExist.img})`}}></div>
        </div>
        <div className='switchSubtitle'>
            {accountStatus === "exist" ? accountExist.subtitle : accountNotExist.subtitle}
        </div>
    </React.Fragment>
  )
}

export default Switch