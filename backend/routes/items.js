// backend/routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Criar um novo item
router.post('/', async (req, res) => {
  const { name, type, description } = req.body;
  const newItem = new Item({ name, type, description });
  try {
    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obter todos os itens
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obter um item por ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Atualizar um item
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar um item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
