const express = require('express');
const { controllerSales } = require('../controllers');

const routerSales = express.Router();

routerSales.get('/', controllerSales.findAll);

routerSales.get('/:id', controllerSales.findById);

routerSales.post('/', controllerSales.addSales);

module.exports = routerSales;
