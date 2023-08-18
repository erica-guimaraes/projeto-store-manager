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

module.exports = {
    findAll,
    findById,
};