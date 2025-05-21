import { useState,useContext,createContext, useEffect } from "react";

const WishlistContext = createContext();
const useWishlistContext = () => useContext(WishlistContext);
export default useWishlistContext;


export const WishlistContextProvider = ({children})=>{

   
    const [wishlistData,setWishlistData] = useState({userId:'',products:[]});

    useEffect(()=>{
         const fetchWishlist = async ()=>{
            try{
                const userId = '67ee246df24c44d71f285bb6';
                if(!userId) return;

                const response = await fetch(`http://localhost:3000/api/wishlist/${userId}`);
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
                setWishlistData((prevState)=>({userId:reqBody.userId,products:[...prevState.products,...data.data.wishlist.productIds]}))
                alert(data.message);
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
            const response =await fetch(`http://localhost:3000/api/wishlist/delete`,{
                method:"Delete",
                body:JSON.stringify(reqBody),
                headers:{"Content-Type":"application/json"}
            });
            
            if(!response.ok){
                throw "Error occurred while fetching wishlist";
            }

            const data = await response.json();
            if(data.message=="Product Removed from wishlist"){
                setWishlistData((prevState)=>({...prevState,products:[...prevState.products.filter((prod)=>prod._id!=productId)]}))
            }
            
        }
    }catch(error){
        console.log("method: addItemToWishlist >> ",error)
    }
   }

    return <WishlistContext.Provider value={{wishlistData,addItemToWishlist,removeItemToWishlist}}>
        {children}
    </WishlistContext.Provider>
}