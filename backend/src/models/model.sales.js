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
    const [[salesId]] = await connection.execute(query, [id]);

    return camelize(salesId);
};

module.exports = {
    findAll,
    findById,
};