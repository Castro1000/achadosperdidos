// backend/models/item.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model('Item', ItemSchema);
