import { useEffect, useState } from "react"

export default function AddAddress(){
    const addressTypeOptions=["Home","Work","Other"];
    
    const userId = '67ee246df24c44d71f285bb6';

    const [showAlert,setShowAlert] = useState(false);
    const [address,setAddress] = useState({
        userId:userId,
        fullName:'',
        phoneNumber:'',
        pincode:'',
        state:'',
        city:'',
        country:'',
        houseNumber:'',
        landmark:'',
        addressType:''
    })

    function triggerAlert(){
        setShowAlert(true);

        setTimeout(()=>{setShowAlert(false)},3000)
    }

    async function createAddress() {
                  const response = await fetch('http://localhost:3000/api/profile/address/add',{
                        method:'POST',
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify(address)
                    })

                    if(!response.ok){
                        
                        //failed to place order;
                    }else{
                         const data = await response.json();
                         //successfull
                         if(data?.message=='Address created'){
                            triggerAlert();
                            
                         }
                    }

                   

                }

    function submitHandler(event){
        event.preventDefault();
        if(address.userId && address.fullName && address.phoneNumber && address.pincode && address.state && address.city && address.country){
            
            console.log("submit");
            createAddress();
        }
    }

    function handleChange(event){
        const {name,value} = event.target;
        setAddress(prev => ({
            ...prev,
            [name]:value
        }))

        console.log("addressValue>>",address)
    }

    return <div className="container py-4 bg-body-tertiary">
        <h2 className="mb-4">Add New Address</h2>
    <form onSubmit={submitHandler} className="row">
        <div className="col-md-6">
            <div className="row">

                 <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="fullName" className="form-control" value={address.fullName} onChange={handleChange}  required/>
                 </div>

                <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input type="text" name="phoneNumber" className="form-control" value={address.phoneNumber} onChange={handleChange} required />
                </div>

                <div className="col-12">
          <label className="form-label">Street Address</label>
          <input
            type="text"
            name="street"
            className="form-control"
            value={address.street}
            onChange={handleChange}
            required
          />
        </div>

       

        <div className="col-md-6">
          <label className="form-label">House Number</label>
          <input
            type="text"
            name="houseNumber"
            className="form-control"
            value={address.houseNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Landmark</label>
          <input
            type="text"
            name="landmark"
            className="form-control"
            value={address.landmark}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            className="form-control"
            value={address.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">State</label>
          <input
            type="text"
            name="state"
            className="form-control"
            value={address.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Pin Code</label>
          <input
            type="number"
            name="pincode"
            className="form-control"
            value={address.pincode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Country</label>
          <input
            type="text"
            name="country"
            className="form-control"
            value={address.country}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
        <label htmlFor="addressType" className="form-label">Address Type</label>
        <select id="addressType" name="addressType" value={address.addressType} onChange={handleChange} className="form-select">
            <option value="">-- Select Address Type --</option>
            {addressTypeOptions.map(type=><option key={type} value={type}>{type}</option>)}
        </select>
        </div>

        <div className="col-md-12 mt-2">
          <button type="submit" className="btn btn-primary">
            Save Address
          </button>
        </div>

             {showAlert && (
        <div className="alert alert-success mt-3" role="alert">
          A simple success alert — check it out!
        </div>
      )}

            </div>
        </div>
       
    </form>
    </div>
}