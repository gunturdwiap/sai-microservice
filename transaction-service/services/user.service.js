
const axios = require('axios');
const { User } = require('../models');
require('dotenv').config();

exports.getUserById = async (id) => {
  // const response = await axios.get(`${process.env.USER_SERVICE_URL}/${id}`);
  // return response.data;

    return await User.findByPk(id);
    // if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
};
