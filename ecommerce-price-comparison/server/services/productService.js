const axios = require('axios');

class ProductService {
  static async searchProducts(query) {
    try {
      const apiKey = process.env.SERP_API_KEY;

      const response = await axios.get('https://serpapi.com/search', {
        params: {
          engine: 'google',
          q: query,
          location: 'India',
          api_key: apiKey
        }
      });

      // Log to see what data is actually coming
      console.log("SERPAPI RAW RESPONSE:", JSON.stringify(response.data, null, 2));

      // Use organic_results instead of shopping_results
      const products = (response.data.organic_results || []).map(product => ({
        name: product.title,
        description: product.snippet || '',
        image: product.thumbnail || '',
        store: product.displayed_link || '',
        price: '', // Not available in organic results
        url: product.link
      }));

      return products;
    } catch (error) {
      console.error('Error searching products:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = ProductService;
