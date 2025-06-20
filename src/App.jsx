import { useState } from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/js/src/collapse"
import Home from './pages/Home';
import Products from './pages/Products';
import { CartContextProvider } from './contexts/CartContext';
import { WishlistContextProvider } from './contexts/WishlistContext';
import Header from './components/Header';
import WishlistPage from './pages/WishlistPage';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import { FilterContextProvider } from './contexts/FilterContext';
import AddAddress from './pages/AddAddress';
import ProfilePage from './pages/ProfilePage';
import Orders from './pages/Orders';
import OrderSummary from './pages/OrderSummary';
import Address from './pages/Address';

function App() {
    

  return (
    <FilterContextProvider>
    <CartContextProvider>
      <WishlistContextProvider>
        
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/products/category/:categoryName" element={<Products/>}></Route>
        <Route path="/products/:productId" element={<ProductDetails/>}></Route>
        <Route path="/wishlist" element={<WishlistPage/>}></Route>
        <Route path="/cart" element={<CartPage/>}></Route>
        <Route path="/profile" element={<ProfilePage/>}></Route>
        <Route path="/profile/address/add" element={<AddAddress/>}></Route>
        <Route path="/profile/address" element={<Address/>}></Route>
        <Route path="/profile/orders" element={<Orders/>}></Route>
        <Route path="/profile/orders/:orderId" element={<OrderSummary/>}></Route>
      </Routes>
    </Router>

    </WishlistContextProvider>
    </CartContextProvider>
    </FilterContextProvider>
  )
}

export default App
