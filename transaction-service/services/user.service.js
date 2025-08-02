
const axios = require('axios');
const { User } = require('../models');
require('dotenv').config();

exports.getUserById = async (id) => {
    return await User.findByPk(id);
};
