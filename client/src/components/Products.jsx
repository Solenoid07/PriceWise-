import React, { useState, useEffect } from 'react';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() { 
    try { 
      const response = await fetch('https://fakestoreapi.com/products'); 
      const data = await response.json();
      setProducts(data);
    } catch (error) { 
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
    } 
  } 

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="products-container">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p className="price">${product.price}</p>
          <p className="description">{product.description.substring(0, 100)}...</p>
          <button className="buy-button">View Details</button>
        </div>
      ))}
    </div>
  );
};

export default Products;