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


function App() {
    

  return (
    <CartContextProvider>
      <WishlistContextProvider>
        
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/products/category/:categoryId" element={<Products/>}></Route>
        <Route path="/products/:productId" element={<ProductDetails/>}></Route>
        <Route path="/wishlist" element={<WishlistPage/>}></Route>
         <Route path="/cart" element={<CartPage/>}></Route>
      </Routes>
    </Router>
    </WishlistContextProvider>
    </CartContextProvider>
  )
}

export default App
