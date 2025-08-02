const axios = require('axios');
const { Product } = require('../models');
require('dotenv').config();

exports.getProductById = async (id) => {
  // const response = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/${id}`);
  // return response.data;

  return await Product.findByPk(id);
};
