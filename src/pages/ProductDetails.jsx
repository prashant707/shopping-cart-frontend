import { useEffect } from "react";
import { Link,useParams } from "react-router-dom";
import useFetch from "../useFetch";
import useCartContext from "../contexts/CartContext";
import useWishlistContext from "../contexts/WishlistContext";

export default function ProductDetails(){
    const {cartData,addItemToCart,removeItemFromCart,increaseDecreaseQuantity}  = useCartContext();
    const {wishlistData,addItemToWishlist,removeItemToWishlist} = useWishlistContext();
    const productId = useParams().productId;
    const {data,loading,error} = useFetch(`http://localhost:3000/shoppingcart/products/${productId}`)
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    console.log("wishlist data in product details>>",wishlistData)
    console.log(" wishlistData?.products?.some((prod)=>prod._id==productId)", wishlistData?.products?.some((prod)=>prod._id==productId))
    console.log("wishlist data in product details>>",cartData)
    console.log("wishlist data in product details>>",data)
    return (<div className="container mt-2 bg-body-tertiary">
        

        {data && data?.data?.product && <div className="row"><div className="col-md-5" style={{ maxWidth: '200px' }}>
        <img src="https://images.pexels.com/photos/27871997/pexels-photo-27871997/free-photo-of-a-suit-and-tie-hanging-on-a-hanger.jpeg" alt="Product" className="img-fluid" />
          <div className="d-grid gap-2 " >
                        {
                        cartData.some((cart)=>cart.product._id==productId) ?
                            (<Link className="btn btn-secondary" to="/cart" type="button" >Go to Cart</Link>):
                            (<button className="btn btn-primary" onClick={()=>addItemToCart(data.data.product)} type="button" >Add to Cart</button>)
                        }

                        {
                        wishlistData?.products?.some((prod)=>prod._id==productId) ?
                            (<button className="btn btn-secondary" onClick={()=>removeItemToWishlist(productId)} type="button" >Remove From Wishlist</button>):
                            (<button className="btn btn-primary" onClick={()=>addItemToWishlist(productId)} type="button" >Add to Wishlist</button>)
                        }
                        </div>
            </div>
            <div className="col-md-7">
                <p>{data.data.product.name}</p>
                 <div className="mb-2">
              <span className="fw-bold fs-4">₹{(data.data.product.price - data.data.product.price*data.data.product.discount/100).toFixed(2)}</span>{' '}
              <span className="text-muted text-decoration-line-through">₹{data.data.product.price}</span>
              <p className="fw-light">{data.data.product.discount}%</p>
            </div>
            <div className="mb-3">
              <span className="me-2 ">Quantity:</span>
              <button className="btn btn-light btn-sm " onClick={()=>increaseDecreaseQuantity(data.data.product,"decrease")}>−</button>
              <span>{cartData.find(cart=>cart.product._id==productId)?.quantity ? cartData.find(cart=>cart.product._id==productId).quantity : 0 }</span>
              <button className="btn btn-light btn-sm " onClick={()=>increaseDecreaseQuantity(data.data.product,"increase")}>+</button>
            </div>

            <div className="mt-3">
            <label className="me-2">Size:</label>
            {sizes.map(size => (
              <button key={size} variant="outline-dark" className="me-2">
                {size}
              </button>
            ))}
          </div>
            <hr/>
            <div className="mt-3">
            <span>{data.data.product.returnPolicty}</span>
          </div>
           <hr/>
          <div className="mt-3">
            <p><strong>Description: </strong></p>
            <ul>{data.data.product?.description.map(desc=><li>{desc}</li>)}</ul>
          </div>
            </div>
            </div>}

        
    </div>)

}