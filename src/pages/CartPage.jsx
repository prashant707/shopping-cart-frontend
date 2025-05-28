import { useEffect, useState } from "react";
import useCartContext from "../contexts/CartContext";
import useWishlistContext from "../contexts/WishlistContext";
import CartProductCard from "./CartProductCard";
import getAddress from "./cartUtility";
import { handleSubmit } from "./cartUtility";



export default function CartPage(){
const {cartData,setCartData,addItemToCart,removeItemFromCart,increaseDecreaseQuantity} = useCartContext();
const {wishlistData,addItemToWishlist,removeItemToWishlist} = useWishlistContext();
const [addressList,setAddressList] = useState([]);
const [selectedAddressId,setSelectedAddressId] = useState("");
const [orderStatus,setOrderStatus] = useState("");
const totalItems = cartData?.length || 0;

const totalAmount = parseFloat(cartData?.reduce((acc,init)=> acc+init.product.price*init.quantity,0).toFixed(2)) || 0;
const totalAmountWithDiscount = parseFloat(cartData?.reduce((acc,init)=>acc+init.product.price*init.quantity-init.product.price*init.quantity*init.product.discount/100,0).toFixed(2)) || 0;
const totalDiscount = (totalAmount - totalAmountWithDiscount) || 0;
const deliveryCharges = 199

const finalAmount = (totalAmountWithDiscount+deliveryCharges);
const userId = '67ee246df24c44d71f285bb6';

useEffect(()=> {
    const fetchAddress = async ()=>{
        const addressList = await getAddress(userId);
        setAddressList(addressList);
    }
   fetchAddress();
    
},[userId])


return <div className="container py-4 bg-body-tertiary">
    {
        totalItems > 0 ? <h3 className="mb-4 text-center">MY CART ({totalItems})</h3> : (<h3 className="mb-4 text-center">Empty Cart</h3>)
    }
    

    {orderStatus && (
  <div className="alert alert-info text-center" role="alert">
    {orderStatus}
  </div>
)}

    <div className="row">
        <div className="col-md-8">
            {
    cartData?.length > 0 ? <CartProductCard cart={{cartData,addItemToCart,removeItemFromCart,increaseDecreaseQuantity}} wishlist={{wishlistData,addItemToWishlist,removeItemToWishlist}} /> : (<div className="text-center"></div>)}
        </div>
        {cartData?.length >0 && <div className="col-md-4 ">
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
                        
                        <form onSubmit={(event)=>handleSubmit(event,userId,cartData,selectedAddressId,removeItemFromCart,setOrderStatus)}>
                            <label htmlFor="selectAddress">Select Address:</label>
                        <select id="selectAddress" onChange={(event)=>setSelectedAddressId(event.target.value)} className="form-select" required>
                            <option value="">---Please Select Address---</option>
                            {addressList.map(address => <option value={address._id}>{`${address.fullName} ${address.houseNumber} ${address.city} ${address.state} ${address.country} - ${address.pincode}`}</option> )}
                        </select>
                        <br/>
                        <input type="submit" className="btn btn-primary " value="Place Order"/>
                        </form>
                        
                    </div>
        </div>}

    </div>
    
    
</div>

}