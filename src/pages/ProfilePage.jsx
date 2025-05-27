import { Link } from "react-router-dom"

export default function ProfilePage(){
    const userDetails = {
        userId:'67ee246df24c44d71f285bb6',
        name:'Test User',
        email:'abc@gmail.com',
        phoneNumber:'8888888',
        address:'123 Main Street, Near Central Park, Mumbai, Maharashtra, 400001, India'

    }
    return <div className="container bd-body-tertiary py-4">
                <div className="row">

                    <div className="col-md-6">
                                             <div className="card p-3">
                
                        <div className="mb-3">
                    <p><strong>Name: </strong>{userDetails.name}</p>
                   <p><strong>Email: </strong>{userDetails.email}</p> 
                    <p><strong>Phone: </strong>{userDetails.phoneNumber}</p> 
                </div>

                <div className="d-grid gap-3">
          <Link to="/profile/orders" className="btn btn-outline-primary">
            View Orders
          </Link>
           
          <Link to="/profile/address" className="btn btn-outline-secondary">
            View Address
          </Link>
        </div>
                   
               
            </div>
                         </div>

                     
                </div>
           
    </div>
}