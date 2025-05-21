import { useState } from "react";
import useCartContext from "../contexts/CartContext"
import useWishlistContext from "../contexts/WishlistContext";
import { Link } from "react-router-dom";

export default function ProductCard({data}){

   const {cartData,addItemToCart,removeItemFromCart} = useCartContext();
   const {wishlistData,addItemToWishlist,removeItemToWishlist} = useWishlistContext();

   console.log("cart data>>",cartData)
    console.log("wishlist data>>",wishlistData)


   


   
   

    return <div className="container py-2">
            <div className="mb-2">
                <span className="fw-bold fs-5">Showing All Products </span> 
                <span className="fw-light">(Showing {data.data && data.data.products.length} products)</span>
            </div>
                <div className="row ">
                    {data.data && data.data.products && data.data.products.map((product)=><div className="col mt-2" key={product._id}><div className="card" style={{width: "15rem"}}>
                        <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img src="https://images.pexels.com/photos/27871997/pexels-photo-27871997/free-photo-of-a-suit-and-tie-hanging-on-a-hanger.jpeg" alt="...." className="card-img-top img-fluid " style={{height: "18rem"}}/>
                    <div className="card-body text-center">
                        <p>{product.name}</p>
                        <p>₹ {product.price}</p>

                        </div>
                        </Link>
                        <div className="card-body text-center">
                        <div className="d-grid gap-2">
                        {
                        cartData.some((cart)=>cart?.product?._id==product._id) ?
                            (<Link className="btn btn-secondary" to="/cart" type="button" >Go to Cart</Link>):
                            (<button className="btn btn-primary" onClick={()=>addItemToCart(product)} type="button" >Add to Cart</button>)
                        }

                        {
                        wishlistData?.products?.some((prod)=>prod._id==product._id) ?
                            (<button className="btn btn-secondary" onClick={()=>removeItemToWishlist(product._id)} type="button" >Remove From Wishlist</button>):
                            (<button className="btn btn-primary" onClick={()=>addItemToWishlist(product._id)} type="button" >Add to Wishlist</button>)
                        }
                        </div>
                                
                            
  

                    </div>
                </div></div>)}
                </div>
                
                
            </div>
}