import { useOutletContext } from "react-router-dom";
import './App.css';

function Cart() {
    const [cartItems, , setCartItems] = useOutletContext(); // Receive setCartItems from Outlet context

    const handleDelete = (indexToRemove) => {
        const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
        setCartItems(updatedCartItems); // Use setCartItems to update state
    };

    return (
      <>
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul className="cartList">
              {cartItems.map((item, index) => (
                <li key={index}>
                  <div className="flexCart">
                    {item.title} - {item.quantity} x {item.price}
                    <button onClick={() => handleDelete(index)}>x</button>
                  </div>
                </li>
              ))}
            </ul>
            <button>Checkout</button>
          </>
        )}
      </>
    );
}

export default Cart;
