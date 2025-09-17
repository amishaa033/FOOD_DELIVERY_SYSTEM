import react from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Orders from "./Pages/Orders/Orders";
import {ToastContainer}  from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';
const App=()=>{
  const URL="https://food-delivery-system-kkt9.onrender.com";
  return(
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add URL={URL}/>}/>
          <Route path="/list" element={<List URL={URL}/>}/>
          <Route path="/Orders" element={<Orders URL={URL}/>}/>
          
        </Routes>
      </div>

    </div>
  )
}
export default App;