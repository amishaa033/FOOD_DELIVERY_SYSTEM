import React, { useContext,  useEffect,  useState } from "react";
import './PlaceOrder.css'
import { StoreContext } from "../../Context/storeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PlaceOrder=()=>{
    const {getTotalAmount,token,food_list,cartItems,url}=useContext(StoreContext)
    const navigate=useNavigate();
    const [data,setData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    })

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    const placeOrder=async (event)=>{
        event.preventDefault();
        const orderItems=[];
        food_list.map((item)=>{
            if(cartItems[item._id]>0){
                let iteminfo=item;
                iteminfo["quantity"]=cartItems[item._id];
                orderItems.push(iteminfo);
            }
        })
        if (!token) {
            alert("You must be logged in to place an order.");
            return;
        }
        if (getTotalAmount() === 0) {
            alert("Your cart is empty. Add items before placing an order.");
            return;
        }
        let orderData={
            address:data,
            items:orderItems,
            amount:getTotalAmount()+2,
        }
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        console.log(response.data); // Debug log
        if (response.data.success && response.data.session_url) {
            window.location.replace(response.data.session_url);
        } else {
            alert("Error");
        }
        // ...existing code...
    useEffect(()=>{
        if(!token){
            navigate('/cart');
        }
        else if(getTotalAmount()===0){
            navigate("/cart")
        }
    },[token, getTotalAmount, navigate])
    }
    return(
        <form onSubmit={placeOrder}className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required name="firstName"  onChange={onChangeHandler} value={data.firstName}type="text" placeholder="First Name" />
                    <input name="lastName" onChange={onChangeHandler} value={data.lastName}type="text" placeholder="Last Name" />

                </div>
                <input required name="email" type="email" onChange={onChangeHandler} value={data.email} placeholder="Email address"/>
                <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
                <div className="multi-fields">
                    <input  required name="city" onChange={onChangeHandler}value={data.city} type="text" placeholder="City" />
                    <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />

                </div>
                <div className="multi-fields">
                    <input required  name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zipcode" />
                    <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />

                </div>
                <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone"/>
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                        <h2>Cart Totals</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>${getTotalAmount()}</p>
                                
                            </div>
                            <hr/>
                            <div className="cart-total-details">
                                <p>Delivery fee</p>
                                <p>${getTotalAmount()===0?0:2}</p>
                                
                            </div>
                            <hr/>
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>${getTotalAmount()===0?0:getTotalAmount()+2}</b>
                            </div>
                            <hr/>
                        </div>
                        <button type="submit">PROCEED TO Payment</button>
                    </div>


            </div>

        </form>
    )
}
export default PlaceOrder;