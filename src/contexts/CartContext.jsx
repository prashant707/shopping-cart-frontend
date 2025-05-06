import { createContext,useContext } from "react";
import { useState } from "react";

const CartContext = createContext();

const useCartContext = ()=> useContext(CartContext);

export default useCartContext;

export const CartContextProvider = ({children})=>{
const [cartData,setCartData] = useState([]);

async function addItemToCart(product){
    try{
        const reqBody = {
            userId:'67ee246df24c44d71f285bb6',
            products:product._id,
            price:product.price
        }
        const response = await fetch(`http://localhost:3000/api/cart/add`,{
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
            const prodAlreadyInCart = cartData.some(cart=>cart.products==product._id);
    console.log("is product already in cart>>",prodAlreadyInCart)
    if(prodAlreadyInCart){
        const updatedCart = cartData.map((cart)=>{
            if(cart.products==product._id){
                return {...cart,quantity:cart.quantity+1}
            }
            return cart;
        })
        setCartData(updatedCart);
    }else{
       const newCartItem = {
        userId:'67ee246df24c44d71f285bb6',
        products:product._id,
        quantity:1,
        price:product.price
       } 

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
            products:product._id
        }
        const response = await fetch(`http://localhost:3000/api/cart/delete`,{
            method:"DELETE",
            body:JSON.stringify(reqBody),
            headers:{"Content-Type":"application/json"}
        })

        const data = await response.json();

        if(data.message=='Item deleted successfully.'){
            setCartData(cartData.filter(cart=>cart.products != product._id)) 
        }
        
    }catch(error){
        console.log(error);
    }
   
   }

return <CartContext.Provider value={{cartData,addItemToCart,removeItemFromCart}}>
    {children}
</CartContext.Provider>
}

