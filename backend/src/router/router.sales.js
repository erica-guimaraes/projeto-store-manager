const express = require('express');
const { controllerSales } = require('../controllers');
const { validateQuantity, validateProductId } = require('../middlewares/validationSales');

const routerSales = express.Router();

routerSales.get('/', controllerSales.findAll);

routerSales.post('/', validateProductId, validateQuantity, controllerSales.addSales);

routerSales.get('/:id', controllerSales.findById);

module.exports = routerSales;
