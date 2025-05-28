import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

export default function Orders(){
const [orders,setOrders] = useState();
const userId = '67ee246df24c44d71f285bb6';
const {data,error,loading} = useFetch(`https://shopping-cart-backend-eta.vercel.app/api/profile/order/${userId}`);

return <div className="container py-4 bg-body-tertiary">

    
    {loading && <p>Loading..</p>}
    {error && <p>{error}</p>}
    
        {data && data?.data?.orders?.length > 0 ? <div> <h3 className="text-center mb-2">Your Orders</h3> 
        <table className="table table-striped-rows"> 
        <thead>
            <tr>
                <th scope="row">Name</th>
                <th scope="row">Order Status</th>
                <th scope="row">Payment Status</th>
                <th scope="row">Amount</th>
            </tr>
        </thead> 
        <tbody>
            {data.data.orders.map(order => 
                <tr key={order._id}>
                    <td>{order.shippingAddress.fullName}</td>
                    
                    <td>{order.orderStatus}</td>
                    <td>{order.paymentStatus}</td>
                    <td>{order.totalAmountWithDiscount+199} <Link to={`profile/order/${order._id}`} className="btn btn-info float-end">View Details</Link></td>
                    
                </tr>
        )}
        </tbody>
        </table></div>:
        <div className="text center mb-2"><h2>No Orders</h2></div>}
    
    
</div>

}