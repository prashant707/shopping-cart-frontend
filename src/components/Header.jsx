import useCartContext from "../contexts/CartContext";
import { NavLink } from "react-router-dom";
import useWishlistContext from "../contexts/WishlistContext";
import useFilterContext from "../contexts/FilterContext";

export default function Header (){
const {cartData} = useCartContext();
const {wishlistData}  = useWishlistContext();
const {filters,setFilters} = useFilterContext();

const cartItemCount = cartData?.length || 0;
const wishlistDataCount = wishlistData?.products?.length || 0;

function handleSearch(event){
const text = event.target.value;
setFilters(prev=>({minPrice: 0,
    maxPrice: 20000,
    sortBy: '',
    selectedCategory: [],rating:'',searchText:text}));
}

return <header className="container">
    <nav className="navbar navbar-expand-lg ">
  <div className="container-fluid ">
    <NavLink className="navbar-brand" to="/">ShoppingSite</NavLink>

    
     
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <div className="mx-auto d-none d-lg-block" style={{ width: "40%" }}>
        <form className="d-flex" role="search">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(event)=>handleSearch(event)}
          />
        </form>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item mx-2">
          <NavLink className="nav-link position-relative" to="/wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
           </svg>
           <span className="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger">
                {wishlistDataCount}
              </span>
          </NavLink>
        </li>
        <li className="nav-item mx-2">
          <NavLink to="/cart" className="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>
 <span className="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger">
                {cartItemCount}
</span>
</NavLink>
        </li>
        <NavLink className="nav-link" to="/profile">
        <li className="nav-item mx-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
</li>
</NavLink>
      </ul>
    </div>
  </div>
</nav>
</header>
}