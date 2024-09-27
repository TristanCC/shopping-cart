import './App.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

function StoreItem({ title, image, price, addToCart }) {
  const [value, setValue] = useState(0);

  const handleInputChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    if (newValue.length <= 2 && newValue !== '') {
      setValue(newValue ? parseInt(newValue, 10) : 0);
    } else {
      alert('Quantities of 1-99 only.');
    }
  };

  const handleQuantityButton = (e) => {
    const buttonText = e.target.textContent;
    if (buttonText === '+') {
      setValue((prevValue) => Math.min(prevValue + 1, 99)); // Max 99
    } else if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    }
  };

  const handleAddToCart = () => {
    if (value > 0) {
      addToCart({ title, image, price }, value);
      setValue(0); // Reset quantity after adding to cart
    } else {
      alert('Please select a quantity greater than 0.');
    }
  };

  return (
    <div className="storeItem">
      <h1 className="productName">{title}</h1>
      <img className="productImage" src={image} alt="product" />
      <h3 className="price">{price}</h3>
      <div className="cartStuff">
        <div className="quantityDiv">
          <button className="quantityButton itemButtons" onClick={handleQuantityButton}>-</button>
          <input
            className="quantity"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={value}
            onChange={handleInputChange}
          />
          <button className="quantityButton itemButtons" onClick={handleQuantityButton}>+</button>
        </div>
        <button className="itemButtons" onClick={handleAddToCart}>Add to cart</button>
      </div>
    </div>
  );
}
StoreItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,
  addToCart: PropTypes.func.isRequired
}


export default StoreItem;
