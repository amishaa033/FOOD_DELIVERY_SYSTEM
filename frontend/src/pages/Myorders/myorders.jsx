import React, { useContext, useEffect, useState } from "react";
import './myorders.css'
import { StoreContext } from "../../Context/storeContext";
import axios from "axios";
import { assets } from "../../assets/food-del-assets/assets/frontend_assets/assets";
const Myorders=()=>{
    const [data,setData]=useState([]);
    const {url,token}=useContext(StoreContext);

    const fetchOrders=async ()=>{
    const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setData(response.data.data);
    }
    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token]

    )
    return(
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order,index)=>
            {
                return(
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon}/>
                        <p>{order.items.map((item,index)=>{
                            if(index===order.items.length-1){
                                return item.name+" X "+item.quantity
                                

                            }
                            else{
                            return item.name+"x "+item.quantity+", "
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items:{order.items.length}</p>
                        <p><span style={{display:'inline-block',width:'10px',height:'10px',borderRadius:'50%',background:order.status==='pending'?'orange':order.status==='paid'?'green':'red',marginRight:'8px'}}></span><b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
                })}
            </div>

        </div>
    )
}
export default Myorders;