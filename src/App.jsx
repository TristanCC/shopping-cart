import { Link } from "react-router-dom";
import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    console.log("Cart updated: ", cartItems);
  }, [cartItems]);

  const addToCart = (item, quantity) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(cartItem => cartItem.title === item.title);
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex].quantity += quantity;
        return updatedCartItems;
      } else {
        return [...prevCartItems, { ...item, quantity }];
      }
    });
  };

  return (
    <>
      <div className="wrapper">
        <div className="navbar">
          <Link to="/"><h1>Home</h1></Link>
          <Link to="/Store"><h1>Store</h1></Link>
          <div className="cartCount">
            <Link to="/Cart"><h1>Cart</h1></Link>
            <h2>{cartItems.reduce((total, item) => total + item.quantity, 0)}</h2>
          </div>
        </div>
        <div className="outlet">
          {/* Pass cartItems and addToCart using Outlet context */}
          <Outlet context={[cartItems, addToCart, setCartItems]} />
        </div>
        <div className="footer">
          <p>Rainforest clothing shop</p>
        </div>
      </div>
    </>
  );
}

export default App;
