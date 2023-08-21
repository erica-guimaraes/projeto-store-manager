const { modelSales } = require('../models');

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

const addSales = async (products) => {
  const result = await modelSales.addSales(products);
  return { status: 'CREATED', data: result };
};

module.exports = {
    findAll,
    findById,
    addSales,
};