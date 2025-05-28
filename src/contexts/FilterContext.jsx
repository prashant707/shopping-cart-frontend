import { createContext,useContext } from "react";
import { useState } from "react";
const FilterContext = createContext();
const useFilterContext = ()=> useContext(FilterContext);
export default useFilterContext;

export const FilterContextProvider = ({children})=>{
    const [filters,setFilters] = useState({
            minPrice:0,
            maxPrice:20000,
            sortBy:'',
            selectedCategory:[],
            rating:'',
            searchText:''
        });

    return <FilterContext.Provider value={{filters,setFilters}}>
        {children}
    </FilterContext.Provider>
}