const db = require('../models');
const User = db.User;
const axios = require('axios');

exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const {name, email} = req.body;

    const user = await User.create(req.body);
    const id = user.id; 
    await axios.post('http://localhost:4003/events', {
      type: 'UserCreated',
      data: {id ,name, email}
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const {name, email} = req.body;
    
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
    await user.update({ name, email });

    await axios.post('http://localhost:4003/events', {
      type: 'UserUpdated',
      data: {id ,name, email}
    });

    res.json({ message: 'User diperbarui' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
    await user.destroy({
      where: { id }
    });

    await axios.post('http://localhost:4003/events', {
      type: 'UserDeleted',
      data: { id }
    });

    res.json({ message: 'User dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

