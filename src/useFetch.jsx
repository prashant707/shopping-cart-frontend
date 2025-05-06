import { useState, useEffect } from "react";

const useFetch = (url)=>{
    const [data,setData]  = useState("");
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true);
        fetch(url)
        .then(resp=>resp.json())
        .then(data=>{
            setData(data);
            setError(null);
        })
        .catch((error)=>{
            setError("An error occurred :",error);
        })
        .finally(()=>setLoading(false))
    },[url]);

    return {data,error,loading};
}

export default useFetch;