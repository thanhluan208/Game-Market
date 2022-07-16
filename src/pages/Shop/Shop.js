import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

import { Grid,Button } from '@mui/material'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ClearIcon from '@mui/icons-material/Clear';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import {useStore} from '../../Store'

import CartItem from './shopComponent/CartItem';
import PopularGame from './shopComponent/PopularGame';
import GameSlide from './shopComponent/GameSlide';
import TopGameDownloaded from './shopComponent/TopGameDownloaded';

import "./Shop.css"

import game1 from '../../Images/Shop/item1.jpg';
import game2 from '../../Images/Shop/item2.jpg';
import game3 from '../../Images/Shop/item3.jpg';
import game4 from '../../Images/Shop/item4.jpg';
import game5 from '../../Images/Shop/item5.jpg';
import game6 from '../../Images/Shop/item6.jpg';
import game7 from '../../Images/Shop/item7.jpg';
import game8 from '../../Images/Shop/item8.jpg';



function Shop() {

  const [total, setTotal] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [cartActive, setCartActive] = React.useState(false);
  const [state,] = useStore()

  const cartItem = state.cartItems
  const currentCustomer = state.customer

  const popularGame = [ 
    {
      name: "Valorant",
      description: "Valorant is a free-to-play, team-based action-adventure game developed and published by Riot Games. It was released on November 14, 2017 for Microsoft Windows, PlayStation 4, and Xbox One.",
      price: Math.floor(Math.random() * 10),
      imgURL: game1,
      star:Math.floor(Math.random() * 6),
      indexInCart: total,
      download: Math.floor(Math.random() * 100000 + 900000)
    },
    {
      name: "League Of Legend",
      description: "League of Legends is a free-to-play, team-based, realm-based hack and slash online video game developed and published by Riot Games. It is the first game in the League of Legends series and the successor to the original Lineage series.",
      price: Math.floor(Math.random() * 10),
      imgURL: game2,
      star:Math.floor(Math.random() * 6),
      indexInCart: total,
      download: Math.floor(Math.random() * 100000 + 900000)
    },
    {
      name: "Counter Strike:Global Offensive",
      description: "Counter-Strike: Global Offensive (CS: GO) is a first-person shooter video game developed and published by Valve Corporation. It is the successor to Counter-Strike, and the third installment in the Counter-Strike series.",
      price: Math.floor(Math.random() * 10),
      imgURL: game3,
      star:Math.floor(Math.random() * 6),
      indexInCart: total,
      download: Math.floor(Math.random() * 100000 + 900000)
    },
    {
      name: "Dota 2",
      description: "Dota 2 is a multiplayer online battle arena video game developed by Valve Corporation and released in 2007 as DotA. It is the second major installment in the Warcraft series, following Warcraft III: Reign of Chaos and preceding the expansion pack DotA 2: Full-erton.",
      price: Math.floor(Math.random() * 10),
      imgURL: game4,
      star:Math.floor(Math.random() * 6),
      indexInCart: total,
      download: Math.floor(Math.random() * 100000 + 900000)
    },
    {
      name: "Assasin's Creed Valhala",
      description: "Assassin's Creed: Valhalla is a 2017 action-adventure video game developed by Ubisoft Quebec and published by Ubisoft. It is the first installment in the Assassin's Creed series and the sequel to the 2010 video game Assassin's Creed.",
      price: Math.floor(Math.random() * 10),
      imgURL: game5,
      star:Math.floor(Math.random() * 6),
      indexInCart: total,
      download: Math.floor(Math.random() * 100000 + 900000)
    },
    {
      name: "Hitman: Absolution",
      description: "Hitman: Absolution is a 2018 action-adventure video game developed by Ubisoft Quebec and published by Ubisoft. It is the second installment in the Assassin's Creed series and the sequel to the 2010 video game Assassin's Creed.",
      price: Math.floor(Math.random() * 10),
      imgURL: game6,
      star:Math.floor(Math.random() * 6),
      indexInCart: total,
      download: Math.floor(Math.random() * 100000 + 900000)
    },
    {
      name :" cyberpunk 2077",
      description: "cyberpunk 2077 is a 2018 action-adventure video game developed by CD Projekt and published by CD Projekt. It is the first installment in the Cyberpunk series and the sequel to the 2011 video game Cyberpunk.",
      price: Math.floor(Math.random() * 10),
      imgURL: game7,
      star:Math.floor(Math.random() * 6),
      indexInCart: total,
      download: Math.floor(Math.random() * 100000 + 900000)
    },
    {
      name :"GTA V",
      description: "GTA V is a 2018 action-adventure video game developed by Rockstar North and published by Rockstar Games. It is the fifth installment in the Grand Theft Auto series and the successor to Grand Theft Auto IV.",
      price: Math.floor(Math.random() * 10),
      imgURL: game8,
      star:Math.floor(Math.random() * 6),
      indexInCart: total,
      download: Math.floor(Math.random() * 100000 + 900000)
    },
  ]


  const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  const newPopularGame = paginate(popularGame, 4, currentPage)

  useEffect(() => {
    setTotal(cartItem.length);
  }, [cartItem.length])

  return (
    <React.Fragment>
      
      
      <Grid container className='shopContainer'>
        
        <Grid item xs={2}></Grid>
        <Grid item xs={8} className="poplarGameContainer">
          <div className='popularGameTitle'>
            <div className='title'>Popular game</div>
            <div className="more">View more</div>
          </div>
          <div className='popularGames'>
              {newPopularGame.map((item, index) =>
                (<PopularGame key={index} game={item}/>)
              )}
          </div>
          <div className={popularGame.length <= 4 ? 'navigationGame disable' : 'navigationGame'}>
            <Button onClick={() => {setCurrentPage(currentPage - 1)}} className={currentPage === 1 ? 'navLeft disable' : 'navLeft '}> <ChevronLeftIcon/> </Button>
            <Button onClick={() => {setCurrentPage(currentPage + 1)}} className={currentPage < Math.ceil(popularGame.length / 4) ? 'navRight' : 'navRight disable'}> <ChevronRightIcon/> </Button>
          </div>
          
          <div className='topGameDownloadedContainer'>
            <div className='title'>Top game downloaded</div>
            <TopGameDownloaded gameList={popularGame}/>
          </div>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <div className='gameSlide'>
            <div className='title'>Recommend for you</div>
            {currentCustomer.status === "active" ? <GameSlide gameList={popularGame}/>: 
              <React.Fragment>
                <div className='gameSlideSubTitle'>Sign in to view personalized recommendations</div>
                <Button className='toSignIn'>
                  <Link to="/logIn">Sign in now</Link>  
                </Button>
              </React.Fragment>
            }
            
      </div>
      <div style={{height:"100px"}}></div>
      <div style={{width:"0px"}}>
        <Button onClick={() => {setCartActive(!cartActive)}} className={cartActive ? 'cartBtn disable' : 'cartBtn'}>
            <div className='totalItem'>{total}</div>
            <ShoppingCartIcon/>
        </Button>
      </div>
      <div  className={cartActive ? "shoppingCartContainer cartActive" : "shoppingCartContainer cartDeactive "}>
          <div style={{display:"flex",justifyContent:"right",position:"sticky",top:"0"}}>
            <Button onClick={() => {setCartActive(!cartActive)}} className="closeCart"><ClearIcon/></Button>
          </div>
          
          <div className='cartTitle'>
              <div className='title'><ShoppingCartIcon style={{height:"40px",width:"40px",marginRight:"10px",color:"#3ec2ae "}}/> Your cart</div>
              <div className='numberTotal'>{total} {total > 1 ? "items" : "item"}</div>
            </div>
            {cartItem.length > 0 ? cartItem.map((item, index) => 
              (
                <CartItem key={index} item={item}/>
              )
            ): <div style={{fontSize:"50px",fontWeight:"bold"}}>Vào mua game đê</div>}
            <div className={cartItem.length > 3 ? 'checkOutBox sticky' : 'checkOutBox absolute'} style={{}}>
            <Button onClick={() => {setCartActive(!cartActive)}} className={cartItem.length > 0 ? "checkOutBtn" : "checkOutBtn disable"}>Check out</Button>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Shop