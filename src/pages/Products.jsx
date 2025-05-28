import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import useFilterContext from "../contexts/FilterContext";


export default function Products(){

    const [apiUrl,setApiUrl] = useState("");
    const [hasCategoryLoaded, setHasCategoryLoaded] = useState(false);
    const [categories,setCategories] = useState([]);
    const {filters,setFilters} = useFilterContext();

    // const [filters,setFilters] = useState({
    //     minPrice:0,
    //     maxPrice:10000,
    //     sortBy:'lowToHigh',
    //     selectedCategory:[],
    //     searchText:''
    // });


    const categoryName = useParams().categoryName;
    // console.log("category>>>",categoryName)

    useEffect(()=> {
        async function fetchCategories() {
            const result = await fetch('https://shopping-cart-backend-eta.vercel.app/shoppingcart/categories')

            if(!result.ok){
                throw "An error occurred.";
            }

            const data = await result.json();
            if(data.data.categories){
                setCategories(data.data.categories.map(cat=>cat.name))
            }
        }
        fetchCategories();
    },[])

    useEffect(() => {
    if (categoryName && !hasCategoryLoaded) {
      setFilters((prev) => ({
        ...prev,
        selectedCategory: [categoryName],
      }));
      setHasCategoryLoaded(true);
    }
  }, [categoryName, hasCategoryLoaded]);

        
    useEffect(() => {
    if (filters.searchText) {
      setApiUrl(
        `https://shopping-cart-backend-eta.vercel.app/api/products?search=${filters.searchText}`
      );
    } else {
       
      setApiUrl(
        `https://shopping-cart-backend-eta.vercel.app/api/products?minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&sortBy=${filters.sortBy}&selectedCategory=${filters.selectedCategory.join('&selectedCategory=')}&rating=${filters.rating}`
      );
    }
  }, [filters]);

    console.log("Api Url>>>",apiUrl);
    const {data,loading,error} = useFetch(`${apiUrl}`);
    console.log("Product Page>>",data)
    console.log("Filter>>>",filters)
    

    

    
    return (<div className="container py-4">
            
            <div className="row">
                <div className="col-md-3">
                    <FilterSidebar categories={categories}/>
           
                </div>
            <div className="col-md-9 bg-light">
                {loading && <p>Loading...</p>}
                {!loading && error && <p>{error}</p>}
                {data?.data?.products?.length>0 ? <ProductCard data={data}/> : <div className="container py-2"><div className="mb-2">
                <span className="fw-bold fs-5">No Products Found. </span> 
                
            </div></div>}
            </div>
            </div>
    </div>);
    
}