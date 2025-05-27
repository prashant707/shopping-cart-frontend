import { useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";



export default function Home(){

    const {data,loading,error} = useFetch('https://shopping-cart-backend-eta.vercel.app/shoppingcart/categories/');
    console.log("Home>>>",data);

    return <div className="container py-4">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <section >
            
                     



            <div>
      <div className="row g-4">
        {data && data?.data?.categories?.map((category, index) => (
          <div className="col-6 col-sm-4 col-md-2 text-center" key={index}>
            <div className="position-relative">
              <img
                src={category.photoUrl}
                alt={category.name}
                className="img-fluid"
              />
              <div className="position-absolute top-50 start-50 translate-middle w-100">
                <div className="bg-white bg-opacity-75 py-1 fw-bold">
                  <Link to={`/products/category/${category.name}`}>{category.name}</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


     



    

                     
           
         
        </section>
        <section className="py-2" >
            <div >
              <img src="https://placehold.co/600x200?text=Hello+World"   style={{width:"100%"}}></img>
            </div>
            

            
        </section>
        <section className="py-2">
         <div className="row ">
                        <div className="col-md-6">
                            <div className="card text-bg-dark">
                                <div className="card-body">
                                    <div className="row">
                                    <div className="col-md-4">
                                        <img src="https://placehold.co/600x400?text=Hello+World" className="img-fluid"/>
                                    </div>
                                    <div className="col-md-6">
                                           <p>New Arrivals</p>
                                           
                                           <div className="py-4">
                                           <h5>Summer Collections</h5>
                                           <p>Choose the best summer collections</p>
                                           </div>
                                    </div>
                                </div>
                                </div>
                                
                            </div>
                        </div>
                         <div className="col-md-6">
                            <div className="card text-bg-dark">
                                <div className="card-body">
                                    <div className="row">
                                    <div className="col-md-4">
                                        <img src="https://placehold.co/600x400?text=Hello+World" className="img-fluid"/>
                                    </div>
                                    <div className="col-md-6">
                                           <p>New Arrivals</p>
                                           
                                           <div className="py-4">
                                           <h5>Summer Collections</h5>
                                           <p>Choose the best summer collections</p>
                                           </div>
                                    </div>
                                </div>
                                </div>
                                
                            </div>
                        </div>
                     </div>
        </section>
    </div>
}

