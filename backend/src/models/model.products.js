const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
    const query = 'SELECT * FROM products';
    const [products] = await connection.execute(query);

    return camelize(products);
};

const findById = async (id) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    const [[productId]] = await connection.execute(query, [id]);

    return camelize(productId);
};

const addProduct = async (productName) => {
  const query = 'INSERT INTO products (name) VALUE (?)';
  const [{ insertId }] = await connection.execute(query, [productName]);

  return insertId;
};
  
module.exports = {
    findAll,
    findById,
    addProduct,
};