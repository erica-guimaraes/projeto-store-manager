const express = require('express');
const { controllerProducts } = require('../controllers');
const validationNewProduct = require('../middlewares/validationsProducts');

const routerProducts = express.Router();

routerProducts.get('/', controllerProducts.findAll);

routerProducts.post('/', validationNewProduct, controllerProducts.addProduct);

routerProducts.get('/:id', controllerProducts.findById);

routerProducts.put('/:id', validationNewProduct, controllerProducts.updateProduct);

module.exports = routerProducts;
