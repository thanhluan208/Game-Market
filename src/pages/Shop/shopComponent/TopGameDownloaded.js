import React, { useState } from 'react'

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';

import bg1 from '../../../Images/Shop/bg1.jpg'
import bg2 from '../../../Images/Shop/bg2.jpg'
import bg3 from '../../../Images/Shop/bg3.jpg'
import bg4 from '../../../Images/Shop/bg4.jpg'
import bg5 from '../../../Images/Shop/bg5.jpg'
import bg6 from '../../../Images/Shop/bg6.jpg'
import bg7 from '../../../Images/Shop/bg7.jpg'
import bg8 from '../../../Images/Shop/bg8.jpg'

import { Button, Rating } from '@mui/material'

function TopGameDownloaded({gameList}) {

  const [currentPage, setCurrentPage] = useState(1)
  const [topGame, setTopGame] = useState(gameList[0])
  const background = [bg1,bg2,bg3,bg4,bg5,bg6,bg7,bg8]
  
  const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }
  
  const useBackground = paginate(background,4,currentPage)
  const games = paginate(gameList,4,currentPage)

  
  return (
    <div className='topGameDownloadedContent'>
      <div className='topGameDownloadedBox'>
        {games.map((game, index) => (
          <div key={index} className='topGameDownloaded'  onMouseEnter={() => {setTopGame(game)}}>
              <div className='topGameDownloadedImg' style={{background:`url(${useBackground[index]})`}}></div>
              <div className='topGameDownloadedInfo'>
                <div className='topGameDownloadedTitle'>{game?.name}</div>
                <Rating value={game?.star} readOnly/>
              </div>
              <div className='topGameDownloadedAction'>
                <FileDownloadIcon/>
                {game?.download}
              </div>
          </div>
        ))}
        <div className={gameList.length > 4 ? 'pagination' : 'disable'}>
          <Button  onClick={() => {setCurrentPage(currentPage - 1)}} className={currentPage > 1 ? 'paginationLeft':'disable'}><WestIcon/></Button>
          <Button  onClick={() => {setCurrentPage(currentPage + 1)}} className={currentPage < Math.ceil(gameList.length/4) ? 'paginationRight' : 'disable'}><EastIcon/></Button>
        </div>
      </div>
      <div className='topGameDownloadedDetail'>
          {topGame?.name}
      </div>
    </div>
  )
}

export default TopGameDownloaded