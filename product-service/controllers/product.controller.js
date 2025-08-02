const db = require('../models');
const Product = db.Product;
const axios = require('axios');

exports.getAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produk tidak ditemukan' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const {name, price, stock} = req.body;

    
    const product = await Product.create({name, price, stock});
    const id = product.id; 
    await axios.post('http://localhost:4003/events', {
      type: 'ProductCreated',
      data: {id, name, price, stock}
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const {name, price, stock} = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product tidak ditemukan' });
    await product.update({ name, price, stock });

    await axios.post('http://localhost:4003/events', {
      type: 'ProductUpdated',
      data: {id, name, price, stock}
    });

    res.json({ message: 'Produk diperbarui' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product tidak ditemukan' });
    await product.destroy({
      where: { id }
    });

    await axios.post('http://localhost:4003/events', {
      type: 'ProductDeleted',
      data: { id }
    });

    res.json({ message: 'Produk dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
