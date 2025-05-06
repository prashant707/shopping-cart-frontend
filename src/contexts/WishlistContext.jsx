import { useState,useContext,createContext } from "react";

const WishlistContext = createContext();
const useWishlistContext = () => useContext(WishlistContext);
export default useWishlistContext;


export const WishlistContextProvider = ({children})=>{
    const [wishlistData,setWishlistData] = useState({userId:'',products:[]});

    async function addItemToWishlist(productId){
    try{
        const isProductInWishlist = wishlistData?.productIds?.includes(productId);
        if(isProductInWishlist){
           return isProductInWishlist;
        }else{
            const reqBody = {
                userId:'67ee246df24c44d71f285bb6',
                productId:productId
            }
            const response =await fetch(`http://localhost:3000/api/wishlist/add`,{
                method:"POST",
                body:JSON.stringify(reqBody),
                headers:{"Content-Type":"application/json"}
            });
            
            if(!response.ok){
                throw "Error occurred while fetching wishlist";
            }

            const data = await response.json();
            
            if(data.message=='Product Added to wishlist'){
                setWishlistData((prevState)=>({userId:reqBody.userId,products:[...prevState.products,productId]}))
                alert(data.message);
            }
            
        }
    }catch(error){
        console.log("method: addItemToWishlist >> ",error)
    }
   }

   async function removeItemToWishlist(productId){
    try{
        const isProductInWishlist = wishlistData?.productIds?.includes(productId);
        if(isProductInWishlist){
           return 
        }else{
            
            
            setWishlistData((prevState)=>({...prevState,products:[...prevState.products.filter((prod)=>prod!=productId)]}))
        }
    }catch(error){
        console.log("method: addItemToWishlist >> ",error)
    }
   }

    return <WishlistContext.Provider value={{wishlistData,addItemToWishlist,removeItemToWishlist}}>
        {children}
    </WishlistContext.Provider>
}