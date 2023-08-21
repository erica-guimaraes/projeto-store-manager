const { serviceSales } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
    const { status, data } = await serviceSales.findAll();
    return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await serviceSales.findById(id);
    return res.status(mapStatusHTTP(status)).json(data);
};

const addSales = async (req, res) => {
  const products = req.body;
  const { status, data } = await serviceSales.addSales(products);
    return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
    findAll,
    findById,
    addSales,
};
