const validateProductId = (req, res, next) => {
  const products = req.body;
  const existingProductId = products.every((product) => product.productId);
  
  if (!existingProductId) return res.status(400).json({ message: '"productId" is required' });
  
  next();
};

const existQuantity = (req, res, next) => {
  const quantity = req.body;
  const existingQuantity = quantity.every((product) => product.quantity);
  
  if (!existingQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const quantity = req.body;
  const validQuantity = quantity.every((product) => product.quantity >= 1);

  if (!validQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  validateProductId,
  existQuantity,
  validateQuantity,
};
