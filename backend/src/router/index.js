const router = require('express').Router();
const routerProducts = require('./router.products');
const routerSales = require('./router.sales');

router.use('/products', routerProducts);
router.use('/sales', routerSales);

module.exports = router;
