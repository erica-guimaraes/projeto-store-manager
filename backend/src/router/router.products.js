const express = require('express');
const { controllerProducts } = require('../controllers');
const validationNewProduct = require('../middlewares/validationsProducts');

const routerProducts = express.Router();

routerProducts.get('/', controllerProducts.findAll);

routerProducts.get('/:id', controllerProducts.findById);

routerProducts.post('/', validationNewProduct, controllerProducts.addProduct);

module.exports = routerProducts;
