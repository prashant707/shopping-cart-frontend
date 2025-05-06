import { useState } from "react";
import useCartContext from "../contexts/CartContext"
import useWishlistContext from "../contexts/WishlistContext";

export default function ProductCard({data}){
//    const {isAddedToCart,setIsAddedToCart} = useState(false);
//{userId:'67ee246df24c44d71f285bb6',products:'68010c0ea96ceadebf7c09b0',quantity:1,price:899.99}
   const {cartData,addItemToCart,removeItemFromCart} = useCartContext();
   const {wishlistData,addItemToWishlist,removeItemToWishlist} = useWishlistContext();

   console.log("cart data>>",cartData)
    console.log("wishlist data>>",wishlistData)


   


   
   
//    const {  productsByCategory } = data;
//    console.log("data inside prod",data);
//    console.log("data inside prod",productsByCategory)
    return <div className="container py-2">
            <div className="mb-2">
                <span className="fw-bold fs-5">Showing All Products </span> 
                <span className="fw-light">(Showing {data.data && data.data.productsByCategory.length} products)</span>
            </div>
                <div className="row ">
                    {data.data && data.data.productsByCategory && data.data.productsByCategory.map((product)=><div className="col" key={product._id}><div className="card" style={{width: "15rem"}}>
                    <img src="https://images.pexels.com/photos/27871997/pexels-photo-27871997/free-photo-of-a-suit-and-tie-hanging-on-a-hanger.jpeg" alt="...." className="card-img-top img-fluid " style={{height: "18rem"}}/>
                    <div className="card-body text-center">
                        <p>{product.name}</p>
                        <p>₹ {product.price}</p>


                        <div className="d-grid gap-2">
                        {
                        cartData.some((cart)=>cart.products==product._id) ?
                            (<button className="btn btn-secondary" onClick={()=>removeItemFromCart(product)} type="button" >Remove From Cart</button>):
                            (<button className="btn btn-primary" onClick={()=>addItemToCart(product)} type="button" >Add to Cart</button>)
                        }

                        {
                        wishlistData?.products?.some((prodId)=>prodId==product._id) ?
                            (<button className="btn btn-secondary" onClick={()=>removeItemToWishlist(product._id)} type="button" >Remove From Wishlist</button>):
                            (<button className="btn btn-primary" onClick={()=>addItemToWishlist(product._id)} type="button" >Add to Wishlist</button>)
                        }
                        </div>
                                
                            
  

                    </div>
                </div></div>)}
                </div>
                
                
            </div>
}