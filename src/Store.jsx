import './App.css';
import StoreItem from './StoreItem';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Store() {
    const [products, setProducts] = useState([]);
    const [, addToCart] = useOutletContext(); // Get addToCart function from Outlet context

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setProducts(json))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <div className="storeContainer">
                {products.map((item) => (
                    <StoreItem
                        key={item.id}
                        title={item.title}
                        image={item.image}
                        price={'$' + item.price.toFixed(2)}
                        addToCart={addToCart} // Pass addToCart to StoreItem
                    />
                ))}
            </div>
        </>
    );
}

export default Store;
