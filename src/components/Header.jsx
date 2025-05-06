import useCartContext from "../contexts/CartContext";
import { NavLink } from "react-router-dom";
import useWishlistContext from "../contexts/WishlistContext";

export default function Header (){
const {cartData,addItemToCart,removeItemFromCart} = useCartContext();
const {wishlistData}  = useWishlistContext();

const cartItemCount = cartData?.length || 0;
const wishlistDataCount = wishlistData?.products?.length || 0;

return <header className="container">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">ShoppingSite</a>

    <form class="d-flex " role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      
    </form>
     <div className="mx-auto d-none d-lg-block" style={{ width: "40%" }}>
        <form className="d-flex" role="search">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item mx-2">
          <NavLink className="nav-link position-relative" >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
           </svg>
           <span className="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger">
                {wishlistDataCount}
              </span>
          </NavLink>
        </li>
        <li class="nav-item mx-2">
          <NavLink className="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>
 <span className="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger">
                {cartItemCount}
</span>
</NavLink>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
</header>
}