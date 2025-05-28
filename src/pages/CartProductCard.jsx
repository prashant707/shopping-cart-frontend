export default function CartProductCard({cart,wishlist}){
    const {cartData,addItemToCart,removeItemFromCart,increaseDecreaseQuantity}  = cart;
    const {addItemToWishlist,removeItemToWishlist} = wishlist;


    async function moveItemToWishlist(product) {
        if(product){
            addItemToWishlist(product);
        removeItemFromCart(product);
        }
        
    }
    return <div className="row"> {cartData.map(item => 
        <div className="col-md-4" key={item._id}>
            <div className="card">
                 <div className="row g-0">
        {/* Left Column - Image */}
        <div className="col-md-4">
          <img
            src={item.product.photoUrl[0]}
            alt="Product"
            className="img-fluid"
            style={{ maxHeight: '250px', objectFit: 'cover' }}
          />
        </div>

        {/* Right Column - Details */}
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title fw-bold">{item.product.name}</h5>
            <div className="mb-2">
              <span className="fw-bold fs-4">₹{(item.product.price - item.product.price*item.product.discount/100).toFixed(2)}</span>{' '}
              <span className="text-muted text-decoration-line-through">₹{item.product.price}</span>
            </div>
            <div className="text-success fw-semibold mb-3">{item.product.discount}% off</div>

            {/* Quantity Section */}
            <div className="mb-3">
              <span className="me-2">Quantity:</span>
              <button className="btn btn-light btn-sm " onClick={()=>increaseDecreaseQuantity(item.product,"decrease")}>−</button>
              <span>{item.quantity}</span>
              <button className="btn btn-light btn-sm " onClick={()=>increaseDecreaseQuantity(item.product,"increase")}>+</button>
            </div>

            {/* Buttons */}
            <div className="d-grid gap-2">
              <button className="btn btn-secondary btn-sm" onClick={()=>removeItemFromCart(item.product)}>Remove From Cart</button>
              <button className="btn btn-outline-secondary btn-sm" onClick={()=>moveItemToWishlist(item.product)}>Move to Wishlist</button>
            </div>
          </div>
        </div>
      </div>

                
            </div>

        </div>
    )}</div> 
}