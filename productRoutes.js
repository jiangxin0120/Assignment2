const express = require('express');
const productController = require('./productController'); // Assuming the controller is in the same directory
const router = express.Router();

// Products CRUD Routes
router.get('/api/products', productController.getAllProducts);
router.get('/api/products/:id', productController.getProductById);
router.post('/api/products', productController.addProduct);
router.put('/api/products/:id', productController.updateProduct);
router.delete('/api/products/:id', productController.removeProduct);
router.delete('/api/products', productController.removeAllProducts);
router.get('/api/products?name=[kw]', productController.searchProductsByName); // The query will be handled in the controller

module.exports = router;
