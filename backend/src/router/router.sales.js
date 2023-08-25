const express = require('express');
const { controllerSales } = require('../controllers');
const { validateQuantity, existQuantity, 
  validateProductId } = require('../middlewares/validationSales');

const routerSales = express.Router();

routerSales.get('/', controllerSales.findAll);

routerSales.post('/', validateProductId, existQuantity, validateQuantity, controllerSales.addSales);

routerSales.get('/:id', controllerSales.findById);

module.exports = routerSales;
