import { createContext,useContext } from "react";
import { useState } from "react";
const FilterContext = createContext();
const useFilterContext = ()=> useContext(FilterContext);
export default useFilterContext;

export const FilterContextProvider = ({children})=>{
    const [filters,setFilters] = useState({
            minPrice:0,
            maxPrice:10000,
            sortBy:'',
            selectedCategory:[],
            rating:1,
            searchText:''
        });

    return <FilterContext.Provider value={{filters,setFilters}}>
        {children}
    </FilterContext.Provider>
}