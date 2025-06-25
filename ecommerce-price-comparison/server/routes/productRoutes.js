const express = require('express');
const router = express.Router();
const ProductService = require('../services/productService'); // Adjust path if needed

// GET /api/products?q=searchTerm
router.get('/', async (req, res) => {
  const query = req.query.q || 'smartphone'; // Default query if none provided

  try {
    const products = await ProductService.searchProducts(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products from SerpApi' });
  }
});

module.exports = router;
