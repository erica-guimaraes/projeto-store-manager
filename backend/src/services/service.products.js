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

const registerProduct = async (product) => {
  const { name } = product;
  const result = await modelProducts.registerProduct(name);

  return { status: 'CREATED', data: { id: result, name } };
};

module.exports = {
    findAll,
    findById,
    registerProduct,
};