
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Dummy array of products
let products = [
  { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
  { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
  { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
  { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
  { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];

// GET all products
app.get('/products', (req, res) => {
  res.json(products);
});

// GET product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(item => item.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// GET products based on search criteria
app.get('/products/search', (req, res) => {
  const { q, minPrice, maxPrice } = req.query;

  let filteredProducts = products;

  if (q) {
    filteredProducts = filteredProducts.filter(item =>
      item.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(item => item.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(item => item.price <= parseFloat(maxPrice));
  }

  res.json(filteredProducts);
});

// POST create a new product
app.post('/products', (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product by ID
app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;

  const index = products.findIndex(item => item.id === productId);

  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// DELETE product by ID
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(item => item.id === productId);

  if (index !== -1) {
    products.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});