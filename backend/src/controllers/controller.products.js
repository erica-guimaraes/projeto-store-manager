const { serviceProducts } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
    const { status, data } = await serviceProducts.findAll();
    return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await serviceProducts.findById(id);
    return res.status(mapStatusHTTP(status)).json(data);
};

const addProduct = async (req, res) => {
  const product = req.body;

  const { status, data } = await serviceProducts.addProduct(product);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { status, data } = await serviceProducts.updateProduct(id, name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await serviceProducts.deleteProduct(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
    findAll,
    findById,
    addProduct,
    updateProduct,
    deleteProduct,
};
