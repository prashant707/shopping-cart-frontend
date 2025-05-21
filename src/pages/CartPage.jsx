import useCartContext from "../contexts/CartContext";
import useWishlistContext from "../contexts/WishlistContext";
import CartProductCard from "./CartProductCard";

export default function CartPage(){
const {cartData,addItemToCart,removeItemFromCart,increaseDecreaseQuantity} = useCartContext();
const {wishlistData,addItemToWishlist,removeItemToWishlist} = useWishlistContext();
const totalItems = cartData?.length || 0;

const totalAmount = parseFloat(cartData?.reduce((acc,init)=> acc+init.product.price*init.quantity,0).toFixed(2)) || 0;
const totalAmountWithDiscount = parseFloat(cartData?.reduce((acc,init)=>acc+init.product.price*init.quantity-init.product.price*init.quantity*init.product.discount/100,0).toFixed(2)) || 0;
const totalDiscount = (totalAmount - totalAmountWithDiscount) || 0;
const deliveryCharges = 199
const finalAmount = (totalAmount+deliveryCharges);


return <div className="container py-4 bg-body-tertiary">
    <h4 className="mb-4 text-center">MY CART ({totalItems})</h4>
    <div className="row">
        <div className="col-md-8">
            {
    cartData?.length > 0 ? <CartProductCard cart={{cartData,addItemToCart,removeItemFromCart,increaseDecreaseQuantity}} wishlist={{wishlistData,addItemToWishlist,removeItemToWishlist}} /> : (<div className="text-center"><h3>Empty Cart</h3></div>)}
        </div>
        {cartData?.length && <div className="col-md-4 ">
                    <div className="card p-2">
                        <h4>Price Details</h4>
                        <hr/>
                        <p className="d-flex justify-content-between"><span>Price ({totalItems} {totalItems>1?"Items":"Item"}) </span><span>₹{totalAmount}</span></p>
                        <p className="d-flex justify-content-between"><span>Discount</span> <span>-₹{totalDiscount}</span></p>
                       <p className="d-flex justify-content-between"><span>Delivery Charges </span> <span>₹{deliveryCharges}</span></p>
                        <hr/>
                        <h5 className="d-flex justify-content-between"> <span>Total Amount</span> <span>₹{finalAmount}</span></h5>
                        <hr/>
                        <p>You will save ₹{totalDiscount.toFixed(2)} on this order.</p>
                        <button className="btn btn-primary">Place Order</button>
                    </div>
        </div>}

    </div>
    
    
</div>

}