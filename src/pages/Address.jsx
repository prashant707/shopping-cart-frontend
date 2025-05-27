import { useState,useEffect } from "react";
import getAddress from "./cartUtility";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

export default function Address(){
    const [isDeletedSuccess,setIsDeletedSuccess] = useState(false);
    const [isNotFound,setIsNotFound] = useState(false);
    const [isError,setIsError] = useState(false);


    useEffect(()=>{
        if(isDeletedSuccess){
          const timeout =  setTimeout(()=>{setIsDeletedSuccess(false);
            window.location.reload();
          },2000);
          return ()=> clearTimeout(timeout);
        }else if(isNotFound){
            const timeout =  setTimeout(()=>{setIsNotFound(false)},2000);
            return ()=> clearTimeout(timeout);
        }else if(isError){
            const timeout =  setTimeout(()=>{setIsError(false)},2000);
            return ()=> clearTimeout(timeout);
        }
    },[isDeletedSuccess,isNotFound,isError])
    
    const userId ='67ee246df24c44d71f285bb6';

    const {data,error,loading} = useFetch(`https://shopping-cart-backend-eta.vercel.app/api/profile/address/${userId}`);

    async function deleteAddressById(event,addressId) {
        const response = await fetch(`https://shopping-cart-backend-eta.vercel.app/profile/address/${addressId}`,{method:'DELETE'});
        if(!response.ok){
            if (response.status == 404) {
                setIsNotFound(true);
            } else {
               setIsError(true);
            }
        }else{
            const data = await response.json();
            if(data?.message=='Address deleted successfully.'){
                setIsDeletedSuccess(true);
                
            }
        }
    }

    return <div className="container py-4 bg-body-tertiary">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {isDeletedSuccess &&<div className="alert alert-info text-center position-fixed top-0 start-50 translate-middle-x mt-3" role="alert" style={{"z-index": "1050", "width": "auto", "max-width": "90%"}}>
    Address delete successfully.
  </div>}


            {isNotFound &&<div className="alert alert-info text-center position-fixed top-0 start-50 translate-middle-x mt-3" role="alert" style={{"z-index": "1050", "width": "auto", "max-width": "90%"}}>
    Address not found .. Please try reloading page.
  </div>}

  {isError && <div className="alert alert-info text-center position-fixed top-0 start-50 translate-middle-x mt-3" role="alert" style={{"z-index": "1050", "width": "auto", "max-width": "90%"}}>
    Error occured please try again later.
  </div>}  

        <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Addresses</h4>
         <Link className="btn btn-primary" to="/profile/address/add">Add Address</Link>
        </div>

        {data?.data?.addresses?.length > 0 ? (
            <div><table className="table table-striped-rows">
            <thead>
                <tr>
                <th scope="row">Name</th>
                <th scope="row">Address</th>
                </tr>
            </thead>
            <tbody>
            {data.data.addresses.map(address=>
            <tr key={address._id}>
            <td>{address.fullName}</td>
            <td>{`${address.houseNumber}, ${address.addressLine1 && address.addressLine1}, ${address.city}, ${address.state}, ${address?.country}, ${address?.pincode}`} <button className="btn btn-danger float-end" onClick={(event)=>deleteAddressById(event,address._id)}>Delete</button></td>
            </tr>)}
            </tbody></table></div>):
            <div><h2>No address found</h2></div>}
    </div>
}