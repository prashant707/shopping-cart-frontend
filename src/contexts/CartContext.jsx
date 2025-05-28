import { createContext,useContext, useEffect } from "react";
import { useState } from "react";

const CartContext = createContext();

const useCartContext = ()=> useContext(CartContext);

export default useCartContext;

export const CartContextProvider = ({children})=>{

const userId = '67ee246df24c44d71f285bb6';
const [isItemAddedToCart,setIsItemAddedToCart] = useState(false);
const [isQuantityIncrease,setIsQuantityIncrease] = useState(false);
const [isQuantityDecrease,setIsQuantityDecrease] = useState(false);
const [isItemRemovedFromCart,setIsItemRemovedFromCart] = useState(false);
const [cartData,setCartData] = useState([]);
console.log("cart data >>>",cartData);


 useEffect(()=>{
       if (isItemAddedToCart) {
    const timeout = setTimeout(() => {
      setIsItemAddedToCart(false);
    }, 3000);
    
    return () => clearTimeout(timeout); 
  } else if (isQuantityIncrease) {
    const timeout = setTimeout(() => {
      setIsQuantityIncrease(false);
    }, 3000);
    
    return () => clearTimeout(timeout); 
  } else if (isQuantityDecrease) {
    const timeout = setTimeout(() => {
      setIsQuantityDecrease(false);
    }, 3000);
    
    return () => clearTimeout(timeout); 
  } else if (isItemRemovedFromCart) {
    const timeout = setTimeout(() => {
      setIsItemRemovedFromCart(false);
    }, 3000);
    
    return () => clearTimeout(timeout); 
  }
        
    },[isItemAddedToCart,isQuantityIncrease,isQuantityDecrease,isItemRemovedFromCart]);

useEffect(()=>{
    const fetchCartData = async ()=>{
        try{
            if(!userId) return;
            const response = await fetch(`https://shopping-cart-backend-eta.vercel.app/api/cart/${userId}`);

        if(!response.ok){
                 
                 return;
                
            }

        const data = await response.json();

        if(data.message==="Cart Data fetched Successfully"){
            setCartData(data.data.cart)
        }
        if(data.message==="No data found."){
            setCartData(data.data.cart)
        }
        }
        catch(error){
            console.log("An error occured while fetching data.")
        }
    }
    fetchCartData();
},[])

async function addItemToCart(product){
    try{
        const reqBody = {
            userId:'67ee246df24c44d71f285bb6',
            productId:product._id,
            // price:product.price
        }
        const response = await fetch(`https://shopping-cart-backend-eta.vercel.app/api/cart/add`,{
            method:"POST",
            body:JSON.stringify(reqBody),
            headers:{'Content-Type':'application/json'}
        });

        console.log("respinse>>",response)

        if(!response.ok){
            throw "Failed to add/update"
        }

        const data = await response.json();
        console.log("data>>",data)
        if(data.message=='Cart updated Successfully.'){
            const prodAlreadyInCart = cartData.some(cart=>cart.product._id==product._id);
    console.log("is product already in cart>>",prodAlreadyInCart)
    if(prodAlreadyInCart){

        const updatedCart = cartData.map((cart)=>{
            if(cart.product._id==product._id){
                return {...cart,quantity:cart.quantity+1}
            }
            return cart;
        })
        setCartData(updatedCart);
    }else{
       const newCartItem = {
        userId:'67ee246df24c44d71f285bb6',
        product:product,
        quantity:1
       } 
       setIsItemAddedToCart(true);
       setCartData((prevState)=>[...prevState,newCartItem])
        }
        
    }
    }catch(error){
        console.log(error)
    }
   
   }

   async function removeItemFromCart(product){

    try{
        const reqBody = {
            userId:'67ee246df24c44d71f285bb6',
            productId:product._id
        }
        const response = await fetch(`https://shopping-cart-backend-eta.vercel.app/api/cart/delete`,{
            method:"DELETE",
            body:JSON.stringify(reqBody),
            headers:{"Content-Type":"application/json"}
        })

        const data = await response.json();

        if(data.message=='Item deleted successfully.'){
            setCartData(prevState=>prevState.filter(cart=>cart.product._id != product._id)) 
        }
        
    }catch(error){
        console.log(error);
    }
   
   }


   async function increaseDecreaseQuantity(product,action) {
     try{
        const reqBody = {
            userId:'67ee246df24c44d71f285bb6',
            productId:product._id,
            action:action
        }
        const response = await fetch(`https://shopping-cart-backend-eta.vercel.app/api/cart/add`,{
            method:"POST",
            body:JSON.stringify(reqBody),
            headers:{'Content-Type':'application/json'}
        });

        console.log("respinse>>",response)

        if(!response.ok){
            throw "Failed to add/update"
        }

        const data = await response.json();
        console.log("data>>",data)
        if(data.message=='Cart updated Successfully.'){
            const prodAlreadyInCart = cartData.some(cart=>cart.product._id==product._id);
    console.log("is product already in cart>>",prodAlreadyInCart)
    if(prodAlreadyInCart && action =="increase"){
        const updatedCart = cartData.map((cart)=>{
            if(cart.product._id==product._id){
                return {...cart,quantity:cart.quantity+1}
            }
            return cart;
        })
        setCartData(updatedCart);
    }else if(prodAlreadyInCart && action =="decrease"){
        const updatedCart = cartData.map((cart)=>{

            if(cart.product._id==product._id && cart.quantity>1){
                return {...cart,quantity:cart.quantity-1}
            }
            return cart;
        })
        setCartData(updatedCart);
    }else if(prodAlreadyInCart){
        const updatedCart = cartData.map((cart)=>{
            if(cart.product._id==product._id){
                return {...cart,quantity:cart.quantity+1}
            }
            return cart;
        })
        setCartData(updatedCart);
    }
    
    else{
       const newCartItem = {
        userId:'67ee246df24c44d71f285bb6',
        product:product,
        quantity:1
       } 

       setCartData((prevState)=>[...prevState,newCartItem])
        }
        
    }else if(data.message=='Product removed from cart.'){
        setCartData(cartData.filter(cart=>cart.product._id != product._id))
    }
    }catch(error){
        console.log(error)
    }
   }

return <CartContext.Provider value={{cartData,isItemAddedToCart,isQuantityIncrease,isQuantityDecrease,isItemRemovedFromCart,addItemToCart,removeItemFromCart,increaseDecreaseQuantity,setCartData}}>
    {children}
</CartContext.Provider>
}

