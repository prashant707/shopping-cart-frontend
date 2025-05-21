import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";


export default function Products(){

    const [apiUrl,setApiUrl] = useState("");
    const [hasCategoryLoaded, setHasCategoryLoaded] = useState(false);
    const [categories,setCategories] = useState([]);

    const [filters,setFilters] = useState({
        minPrice:0,
        maxPrice:2000,
        sortBy:'lowToHigh',
        selectedCategory:[],
        searchText:''
    });


    const categoryId = useParams().categoryId;

    useEffect(()=> {
        async function fetchCategories() {
            const result = await fetch('http://localhost:3000/shoppingcart/categories')

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
    if (categoryId && !hasCategoryLoaded) {
      setFilters((prev) => ({
        ...prev,
        selectedCategory: [categoryId],
      }));
      setHasCategoryLoaded(true);
    }
  }, [categoryId, hasCategoryLoaded]);

        
    useEffect(() => {
    if (filters.searchText) {
      setApiUrl(
        `http://localhost:3000/api/products?search=${filters.searchText}`
      );
    } else {
      setApiUrl(
        `http://localhost:3000/api/products?minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&sortBy=${filters.sortBy}&selectedCategory=${filters.selectedCategory}`
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
                    <FilterSidebar filters={filters} setFilters={setFilters} categories={categories}/>
           
                </div>
            <div className="col-md-9 bg-light">
                 {data?.data?.products && <ProductCard data={data}/>}
            </div>
            </div>
    </div>);
    
}