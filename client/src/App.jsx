import { useState, useEffect } from 'react'
import './App.css'
import Products from './components/Products'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`http://localhost:5000/api/products/search?query=${encodeURIComponent(searchQuery)}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      
      const data = await response.json()
      setSearchResults(data)
    } catch (err) {
      console.error('Error searching products:', err)
      setError('Failed to search products. Please try again.')
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Smartphone Price Comparison India</h1>
        <p className="subtitle">Compare smartphone prices across top Indian e-commerce platforms</p>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for smartphones..."
            className="search-input"
          />
          <button type="submit" className="search-button" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </header>

      <main className="main-content">
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        
        {isLoading ? (
          <div className="loading-state">
            <p>Searching across top Indian stores...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="search-results">
            {searchResults.map((product, index) => (
              <div key={index} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="prices">
                  {product.prices.map((price, idx) => (
                    <div 
                      key={idx} 
                      className={`price-item ${idx === 0 ? 'best-price' : ''}`}
                    >
                      <span>{price.store}</span>
                      <span>₹{price.amount.toFixed(2)}</span>
                      {price.url && (
                        <a href={price.url} target="_blank" rel="noopener noreferrer" className="store-link">
                          View Deal
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Search for smartphones to compare prices across Amazon India, Flipkart, and Reliance Digital</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App