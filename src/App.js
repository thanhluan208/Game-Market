import './App.css';
import { Routes, Route } from 'react-router-dom';

// Import component
import Navigation from "./Navigation/Nav"
// Import pages
import Home from "./pages/Home/Home"
import Shop from "./pages/Shop/Shop"
import Blog from "./pages/Blog/blog"
import Review from "./pages/review"
import About from './pages/About.js';
import Product from './pages/Product/product'
import LogIn from './pages/LogIn/LogIn';
import Customer from './pages/Customer/Customer';
import Admin from './pages/Admin/Admin'
import User from './pages/User/User'

import Box from './Component/Box';


import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <div className="App">
      <div className='fixedBG'></div>
      <Navigation/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/Shop" element = {<Shop/>}/>
        <Route path = "/Blog" element = {<Blog/>}/>
        <Route path = "/Review" element = {<Box/>}/>
        <Route path = "/About" element = {<Box/>}/>
        <Route path = "/product" element={<Product/>}/>
        <Route path = "/logIn" element={<LogIn/>}/>
        <Route path = "/customer" element={<Customer/>}/>
        <Route path = "/user" element={<User/>}/>
        <Route path = "/admin" element={<Admin/>}/>
      </Routes>
    </div>
  );
}

export default App;
