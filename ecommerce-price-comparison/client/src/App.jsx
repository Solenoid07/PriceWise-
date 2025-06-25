import React from 'react';
import './App.css';
import Products from './components/Products';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>E-commerce Price Comparison</h1>
      </header>
      <Products />
    </div>
  );
}

export default App;