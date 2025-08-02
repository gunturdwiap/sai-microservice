const axios = require('axios');
const { Product } = require('../models');
require('dotenv').config();

exports.getProductById = async (id) => {
  return await Product.findByPk(id);
};

exports.decreaseStock = async (id, quantity) => {
  const product = await this.getProductById(id);

  if (!product) throw new Error('Product tidak ditemukan');

  if (product.stock < quantity) throw new Error('Stok tidak cukup');

  product.stock -= quantity;
  await product.save();

  await axios.post('http://localhost:4003/events', {
    type: 'ProductStockUpdated',
    data: { id: product.id, stock: product.stock, updatedAt: product.updatedAt }
  });

  return product;
};
