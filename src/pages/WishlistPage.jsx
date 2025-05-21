import { useState,useEffect } from "react";
import useWishlistContext from "../contexts/WishlistContext"
import useCartContext from "../contexts/CartContext";

export default function WishlistPage(){
    const userId ='67ee246df24c44d71f285bb6'
    const [wishlistProduct,setWishlistProduct] = useState({ userId, products: [] });
    const {addItemToCart} = useCartContext();
    const {wishlistData,removeItemToWishlist} = useWishlistContext();

    function handleMoveToCart(product){
        if(product._id){
            addItemToCart(product);
            removeItemToWishlist(product._id)
        }
    }
    console.log("wishlistProduct",wishlistData)
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
                        setWishlistProduct({ userId, products: data.data.productIds });
                    }else{
                        setWishlistProduct({ userId, products: [] });
                    }
    
                }catch(error){
                    console.log("An error occurred",error)
                }
        }
    
        fetchWishlist();
        },[])
    return <div className="container"> 
    <div className="text-center"><h2>My Wishlist</h2></div>
   
        {wishlistData.products.length>0 ?  (<div className="row mt-2"> {wishlistData.products.map((product) => <div className="col-md-2 mt-2" key={product._id}>
<div className="card">
    <div className="card-body">
        <img src="https://images.pexels.com/photos/27871997/pexels-photo-27871997/free-photo-of-a-suit-and-tie-hanging-on-a-hanger.jpeg" alt="...." className="card-img-top img-fluid " style={{height: "14rem"}}/>
        
    </div>
    <div className="card-body text-center">
                        <p>{product.name}</p>
                        <p>₹ {product.price}</p>

                        </div>
                        <div className="d-grid">
            {<button className="btn btn-secondary" onClick={()=>handleMoveToCart(product)}>Move to Cart</button>}
        </div>
</div>
    </div>)}
    </div>): (<div><p>No Product in Wishlist</p></div>)
        }
    
    

    </div>
}