const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const query = `SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity
                    FROM sales_products AS sp
                    INNER JOIN sales AS sa
                    ON sp.sale_id = sa.id
                    ORDER BY sp.sale_id, sp.product_id;`;
  const [sales] = await connection.execute(query);
  return camelize(sales);
};

const findById = async (id) => {
  const query = `SELECT sa.date, sp.product_id, sp.quantity
                    FROM sales_products AS sp
                    INNER JOIN sales AS sa
                    ON sp.sale_id = sa.id
                    WHERE sp.sale_id = ?
                    ORDER BY sp.sale_id, sp.product_id`;
  const [salesId] = await connection.execute(query, [id]);
  return camelize(salesId);
};

const addSales = async (vendas) => {
  const query = 'INSERT INTO sales () values ()';

  const queryVendas = `INSERT INTO 
                        sales_products (sale_id, product_id, quantity) values (?, ?, ?)`;

  const [{ insertId }] = await connection.execute(query);

  const produtosVendidos = vendas.map((venda) => 
    connection.execute(queryVendas, [insertId, venda.productId, venda.quantity]));

  await Promise.all(produtosVendidos);
  return insertId;
};

module.exports = {
    findAll,
    findById,
    addSales,
};