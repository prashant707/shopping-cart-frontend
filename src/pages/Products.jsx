import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import ProductCard from "./ProductCard";

function FilterSidebar({filters,setFilters}){


    const handleChange =(event)=>{
        const {name,value} = event.target;

        setFilters((prevState)=>({
            ...prevState,[name]:value
        }))
    }
    return <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
  <h5>Filters</h5>
  <p onClick={() => setFilters({
    minPrice: 0,
    maxPrice: 5000,
    sortBy: '',
    selectedCategory: '',
  })}>Clear</p>
</div>
            

            <div className="mb-4">
        <label className="form-label">Price</label>
        <input type="range" className="form-range" min="0" max="5000" step="50"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxPrice: parseInt(e.target.value) }))
          }
        />
        <div className="d-flex justify-content-between">
          <span>₹{filters.maxPrice}</span>
          <span>₹5000</span>
        
      </div>

            <h4>Sort By</h4>
            <label>Price - Low to High  <input type="radio" name="sortBy" value="lowToHigh" onChange={handleChange}/> </label><br/>
            <label>Price - High to Low  <input type="radio" name="sortBy" value="highToLow" onChange={handleChange}/> </label>
           
        </div>
    </div>
}

export default function Products(){
    const categoryId = useParams().categoryId;
    console.log(useParams());
    
    const {data,loading,error} = useFetch(`http://localhost:3000/shoppingcart/products/categories/${categoryId}`);
    const [filters,setFilters] = useState({
        minPrice:0,
        maxPrice:2000,
        sortBy:'',
        selectedCategory:''
    });
   console.log("Product Page>>",data)
   console.log("Filter>>>",filters)
    const getFilteredProducts = ()=>{
        if(loading || error || !data?.data?.productsByCategory){
            return [];
        }

        console.log("In functuion>>",data)
        let filteredData = data?.data?.productsByCategory?.filter((product)=>product.price >= filters.minPrice && product.price <=filters.maxPrice);
         console.log("---",filteredData)
        if(filters.selectedCategory){
            filteredData = filteredData.filter((product)=>product.category.name==filters.selectedCategory)
        }

        if(filters.sortBy == 'lowToHigh'){
            filteredData.sort((a,b)=>  a.price - b.price)
        }else if(filters.sortBy=='highToLow'){
            filteredData.sort((a,b)=>  b.price - a.price)
        }
       
        return {"data":{"productsByCategory":filteredData}};
    }

    const filteredData = getFilteredProducts();
    console.log("Filter Dtaa >>>",filteredData)

    

    
    return (<div className="container py-4">
            
            <div className="row">
                <div className="col-md-3">
                    <FilterSidebar filters={filters} setFilters={setFilters}/>
           
                </div>
            <div className="col-md-9 bg-light">
                 <ProductCard data={filteredData}/>
            </div>
            </div>
    </div>);
    
}