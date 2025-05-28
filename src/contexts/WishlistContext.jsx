import { useState,useContext,createContext, useEffect } from "react";

const WishlistContext = createContext();
const useWishlistContext = () => useContext(WishlistContext);

export default useWishlistContext;


export const WishlistContextProvider = ({children})=>{
    const [isItemRemovedFromWishlist,setIsItemRemovedFromWishlist] = useState(false);
    const [isItemAddedToWishlist,setIsItemAddedToWishlist] = useState(false);
    const [wishlistData,setWishlistData] = useState({userId:'',products:[]});
     const userId = '67ee246df24c44d71f285bb6';
    

    useEffect(()=>{
       if (isItemAddedToWishlist) {
    const timeout = setTimeout(() => {
      setIsItemAddedToWishlist(false);
    }, 3000);
    
    return () => clearTimeout(timeout); 
  }
        
    },[isItemAddedToWishlist]);

    useEffect(()=>{
       if (isItemRemovedFromWishlist) {
    const timeout = setTimeout(() => {
      setIsItemRemovedFromWishlist(false);
    }, 3000);
    
    return () => clearTimeout(timeout); 
  }
        
    },[isItemRemovedFromWishlist]);

    useEffect(()=>{
         const fetchWishlist = async ()=>{
            try{
               
                if(!userId) return;

                const response = await fetch(`https://shopping-cart-backend-eta.vercel.app/api/wishlist/${userId}`);
                if(!response.ok){
                throw "Error occurred while fetching wishlist";
            }
                const data = await response.json();
                console.log("Data wishlist inside useeffect >>>", data)
                if(data && data?.data?.productIds?.length > 0 ){
                    setWishlistData({ userId, products: data.data.productIds.map(prod=>prod) });
                }else{
                    setWishlistData({ userId, products: [] });
                }

            }catch(error){
                console.log("An error occurred",error)
            }
    }

    fetchWishlist();
    },[])
   

    async function addItemToWishlist(productId){
    try{
        // const isProductInWishlist = wishlistData?.productIds?.includes(productId);
        const isProductInWishlist = wishlistData?.products?.some((product)=>product._id == productId);
        if(isProductInWishlist){
           return isProductInWishlist;
        }else{
            const reqBody = {
                userId:'67ee246df24c44d71f285bb6',
                productId:productId
            }
            const response =await fetch(`https://shopping-cart-backend-eta.vercel.app/api/wishlist/add`,{
                method:"POST",
                body:JSON.stringify(reqBody),
                headers:{"Content-Type":"application/json"}
            });
            
            if(!response.ok){
                throw "Error occurred while fetching wishlist";
            }

            const data = await response.json();
            
            if(data.message=='Product Added to wishlist'){
                if(wishlistData?.products?.some(product=>product._id==productId)){
                    return;
                }
                setWishlistData((prevState)=>({...prevState,userId:reqBody.userId,products:[...data.data.wishlist.productIds]}))
                setIsItemAddedToWishlist(true);
            }
            
        }
    }catch(error){
        console.log("method: addItemToWishlist >> ",error)
    }
   }

   async function removeItemToWishlist(productId){
    try{
        // const isProductInWishlist = wishlistData?.products?.includes(productId);
        const isProductInWishlist = wishlistData?.products?.some((product)=>product._id == productId);
         console.log("remove from wishlist >>>",wishlistData)
        console.log("remove from wishlist >>>",productId)
        console.log("remove from wishlist >>>",isProductInWishlist)
        if(!isProductInWishlist){
           return 
        }else{
            
            const reqBody = {
                userId:'67ee246df24c44d71f285bb6',
                productId:productId
            }
            const response =await fetch(`https://shopping-cart-backend-eta.vercel.app/api/wishlist/delete`,{
                method:"Delete",
                body:JSON.stringify(reqBody),
                headers:{"Content-Type":"application/json"}
            });
            
            if(!response.ok){
                throw "Error occurred while fetching wishlist";
            }

            const data = await response.json();
            if(data.message=="Product Removed from wishlist"){
                setWishlistData((prevState)=>({...prevState,products:[...prevState.products.filter((prod)=>prod._id!=productId)]}));
                setIsItemRemovedFromWishlist(true);
            }
            
        }
    }catch(error){
        console.log("method: addItemToWishlist >> ",error)
    }
   }

    return <WishlistContext.Provider value={{wishlistData,addItemToWishlist,removeItemToWishlist,isItemAddedToWishlist,isItemRemovedFromWishlist}}>
        {children}
    </WishlistContext.Provider>
}