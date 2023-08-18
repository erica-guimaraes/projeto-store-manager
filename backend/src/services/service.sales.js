const { modelSales } = require('../models');

const findAll = async () => {
    const result = await modelSales.findAll();
    return { status: 'SUCCESSFUL', data: result };
};

const findById = async (id) => {
    const result = await modelSales.findById(id);
    if (!result) {
        return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
    }

    return { status: 'SUCCESSFUL', data: result };
};

module.exports = {
    findAll,
    findById,
};