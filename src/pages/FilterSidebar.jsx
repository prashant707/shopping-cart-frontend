import useFilterContext from "../contexts/FilterContext";

export default function FilterSidebar({categories}){

    const {filters,setFilters} = useFilterContext();
    const ratings = [1,2,3,4,5];
    const handleChange =(event)=>{
        const {value,checked} = event.target;
        if(checked){
             setFilters((prevState)=>({
            ...prevState,selectedCategory:[...prevState.selectedCategory,value]
        }))
        
        }else{
           setFilters((prevState)=>({
            ...prevState,selectedCategory:[...prevState.selectedCategory.filter((category)=>category!=value)]
        })) 
        }
       
    }
    return <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
  <h5>Filters</h5>
  <p onClick={() => setFilters({
    minPrice: 0,
    maxPrice: 20000,
    sortBy: '',
    selectedCategory: [],
    rating:1,
    searchText:''
  })}>Clear</p>
</div>
            

            <div className="mb-4">
        <label className="form-label">Price</label>
        <input type="range" className="form-range" min="0" max="10000" step="50"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxPrice: parseInt(e.target.value) }))
          }
        />
        <div className="d-flex justify-content-between">
          <span>₹{filters.minPrice}</span>
          <span>₹{filters.maxPrice}</span>
        
      </div>
          <br/>
        <div>
{/*  */}
            <h4>Sort By</h4>
            <label>Price - Low to High  <input type="radio" name="sortBy" checked={filters.sortBy.includes("lowToHigh")}  value="lowToHigh" onChange={(event)=>{setFilters(prev=>({...prev,sortBy:event.target.value}))}}/> </label><br/>
            <label>Price - High to Low  <input type="radio" name="sortBy" checked={filters.sortBy.includes("highToLow")}   value="highToLow" onChange={(event)=>{setFilters(prev=>({...prev,sortBy:event.target.value}))}}/> </label>
        </div>

        <br/>
        <div>
            <h4>Categories</h4>
            {categories.map((category)=><div key={category}>
                <input type="checkbox" name="category" checked={filters.selectedCategory.includes(category)} value={category} onChange={(event)=>handleChange(event)}/>
                <label>{category}</label>
            </div>)}
        </div> 
          <br/>
      <div>
        <h4>Rating:</h4>
        {ratings.map(rating=><div><input type="radio" name="radio" value={rating} checked={filters.rating==rating} onChange={(event)=>setFilters(prev=>({...prev,rating:Number(event.target.value)}))}/> <label>{`${rating} star & above`}</label></div>)}
        </div>  
        </div>
    </div>
}