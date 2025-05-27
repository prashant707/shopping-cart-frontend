import { useState } from "react";
import useCartContext from "../contexts/CartContext"
import useWishlistContext from "../contexts/WishlistContext";
import { Link } from "react-router-dom";

export default function ProductCard({data}){

   const {cartData,addItemToCart,isItemAddedToCart,isQuantityIncrease,isQuantityDecrease,isItemRemovedFromCart} = useCartContext();
   const {wishlistData,addItemToWishlist,removeItemToWishlist,isItemAddedToWishlist,isItemRemovedFromWishlist} = useWishlistContext();

   console.log("cart data>>",cartData)
    console.log("wishlist data>>",wishlistData)


   


   
   

    return <div className="container py-2">
         {isItemAddedToCart &&<div className="alert alert-info text-center position-fixed top-0 start-50 translate-middle-x mt-3" role="alert" style={{"z-index": "1050", "width": "auto", "max-width": "90%"}}>
    Item added to Cart.
  </div>}


            {isItemAddedToWishlist &&<div className="alert alert-info text-center position-fixed top-0 start-50 translate-middle-x mt-3" role="alert" style={{"z-index": "1050", "width": "auto", "max-width": "90%"}}>
    Item added to wishlist.
  </div>}

  {isItemRemovedFromWishlist && <div className="alert alert-info text-center position-fixed top-0 start-50 translate-middle-x mt-3" role="alert" style={{"z-index": "1050", "width": "auto", "max-width": "90%"}}>
    Item removed from wishlist.
  </div>}    
        
            <div className="mb-2">
                <span className="fw-bold fs-5">Showing All Products </span> 
                <span className="fw-light">(Showing {data.data && data.data.products.length} products)</span>
            </div>
                <div className="row ">
                    {data.data && data.data.products && data.data.products.map((product)=><div className="col mt-2" key={product._id}><div className="card" style={{width: "15rem"}}>
                        <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img src={product.photoUrl[0]} alt="...." className="card-img-top img-fluid " style={{height: "18rem"}}/>
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