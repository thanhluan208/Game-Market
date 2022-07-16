import React from 'react'

function News({information}) {


  return (
    <div className='news'>
        <div className='newsHeader'>
            <div className='title'>
                <div></div>
                {information.title}
            </div>
            <div className='date'>{information.date}</div>
        </div>
        <div className='imgBox' style={{background:`url(${information.imgURL})`}}></div>
    </div>
  )
}

export default News