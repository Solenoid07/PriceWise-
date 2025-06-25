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
      const response = await fetch('http://localhost:5000/api/products?q=iphone');
      if (!response.ok) throw new Error('API request failed');
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
      {products.map((product, index) => (
        <div key={index} className="product-card">
          {product.image && <img src={product.image} alt={product.name} />}
          <h3>{product.name}</h3>
          <p className="description">{product.description?.substring(0, 100)}...</p>
          <p className="price">{product.price || 'No Price Info'}</p>
          <a href={product.url} target="_blank" rel="noreferrer">
            <button className="buy-button">View Details</button>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Products;
