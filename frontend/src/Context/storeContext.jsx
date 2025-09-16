import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
    const [cartItems,setCartItems]=useState({})
    const url="http://localhost:4000";
    const [token,setToken]=useState("");
    const [food_list,setFood_list]=useState([]);
    const addToCart=async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }

    }
    const removeFromCart=async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }
    const getTotalAmount=()=>{
        let toalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
            let itemInfo=food_list.find((product)=>product._id===item);
            toalAmount+=itemInfo.price*cartItems[item];
            }

        }
        return toalAmount;
    }
    const fetchFoodList=async()=>{
        const response=await axios.get(url+"/api/food/list");
        setFood_list(response.data.data);
    }
    const loadCartData = async () => {
        const response = await axios.get(url + "/api/cart/get", {}, { headers: { token } });
        if (response.data.cartData && Object.keys(response.data.cartData).length > 0) {
            setCartItems(response.data.cartData);
        } else {
            const saved = localStorage.getItem("cartItems");
            setCartItems(saved ? JSON.parse(saved) : {});
        }
    };
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        };
        loadData();
    }, []);
    

    const contextValue = {
        food_list,
         cartItems,
         setCartItems,
         addToCart,
         removeFromCart,
         getTotalAmount,
         url,
         token,
         setToken

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;