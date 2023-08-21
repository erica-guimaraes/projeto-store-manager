const express = require('express');
const { controllerProducts } = require('../controllers');

const routerProducts = express.Router();

routerProducts.get('/', controllerProducts.findAll);

routerProducts.get('/:id', controllerProducts.findById);

routerProducts.post('/', controllerProducts.registerProduct);

module.exports = routerProducts;
