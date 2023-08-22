const { modelSales, modelProducts } = require('../models');

const findAll = async () => {
    const result = await modelSales.findAll();
    return { status: 'SUCCESSFUL', data: result };
};

const findById = async (id) => {
    const result = await modelSales.findById(id);
    if (!result || result.length === 0) {
        return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
    }

    return { status: 'SUCCESSFUL', data: result };
};

const addSales = async (vendas) => {
  const bodyIds = vendas.map(({ productId }) => productId);
  const allProducts = await modelProducts.findAll();
  const bdIds = allProducts.map(({ id }) => id);

  if (bodyIds.some((id) => !bdIds.includes(id))) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const result = await modelSales.addSales(vendas);
  const data = { id: result, itemsSold: vendas };
  return { status: 'CREATED', data };
};

module.exports = {
    findAll,
    findById,
    addSales,
};