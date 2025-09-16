import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopUp/loginPopup";
import Verify from "./pages/verify/verify";
import Myorders from "./pages/Myorders/myorders";
const app=()=>{
  const [showLogin,setShowLogin]=useState(false);

  return(
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
     <Routes>
      <Route path='/'element={<Home/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/order' element={<PlaceOrder/>} /> 
      <Route path='/verify' element={<Verify/>}/>
      <Route path='/myorders' element={<Myorders/>}/>

     </Routes>
    </div>
    <Footer/>
    </>
  )
}
export default app;