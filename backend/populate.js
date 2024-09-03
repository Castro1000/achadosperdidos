// backend/populate.js
const mongoose = require('mongoose');
const Item = require('./models/item');

mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const items = [
  { name: 'Documento A', type: 'document', description: 'Descrição do Documento A' },
  { name: 'Objeto B', type: 'object', description: 'Descrição do Objeto B' },
  { name: 'Documento C', type: 'document', description: 'Descrição do Documento C' },
];

Item.insertMany(items)
  .then(() => {
    console.log('Items inserted');
    mongoose.connection.close();
  })
  .catch(err => console.log(err));
