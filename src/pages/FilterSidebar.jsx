export default function FilterSidebar({filters,setFilters,categories}){


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
    maxPrice: 5000,
    sortBy: '',
    selectedCategory: '',
    searchText:''
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
          <br/>
        <div>
            <h4>Sort By</h4>
            <label>Price - Low to High  <input type="radio" name="sortBy" checked={filters.sortBy.includes("lowToHigh")} value="lowToHigh" onChange={handleChange}/> </label><br/>
            <label>Price - High to Low  <input type="radio" name="sortBy" checked={filters.sortBy.includes("highToLow")} value="highToLow" onChange={handleChange}/> </label>
        </div>

        <br/>
        <div>
            <h4>Categories</h4>
            {categories.map((category)=><div key={category}>
                <input type="checkbox" name="category" checked={filters.selectedCategory.includes(category)} value={category} onChange={(event)=>handleChange(event)}/>
                <label>{category}</label>
            </div>)}
        </div> 

        </div>
    </div>
}