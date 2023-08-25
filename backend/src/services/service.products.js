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

// const deleteProduct = async (id) => {
//   const product = await modelProducts.findById(id);
//   if (!product) {
//     return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
//   }

//   await modelProducts.deleteProduct(id);
//   return { status: 'NO_CONTENT' };
// };

module.exports = {
    findAll,
    findById,
    addProduct,
    updateProduct,
    // deleteProduct,
};