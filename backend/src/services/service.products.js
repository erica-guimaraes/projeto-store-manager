const { modelProducts } = require('../models');

const findAll = async () => {
    const result = await modelProducts.findAll();
    return { status: 'SUCCESSFUL', data: result };
};

const findById = async (id) => {
    const result = await modelProducts.findById(id);
    if (!result) {
        return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    }

    return { status: 'SUCCESSFUL', data: result };
};

const addProduct = async (product) => {
  const { name } = product;
  const result = await modelProducts.addProduct(name);

  return { status: 'CREATED', data: { id: result, name } };
};

const updateProduct = async (id, name) => {
  const productId = await modelProducts.findById(id);
  if (!productId) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const product = await modelProducts.updateProduct(id, name);
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
    findAll,
    findById,
    addProduct,
    updateProduct,
};