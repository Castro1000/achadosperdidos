const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rota para salvar os itens no arquivo itens.json
app.post('/api/salvar-item', (req, res) => {
  const novoItem = req.body;

  // Carregar o arquivo JSON existente
  fs.readFile('itens.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo JSON:', err);
      res.status(500).send('Erro ao salvar o item.');
      return;
    }

    // Parsear o conteúdo JSON
    let itens = JSON.parse(data);

    // Adicionar o novo item ao array
    itens.push(novoItem);

    // Escrever o arquivo JSON atualizado
    fs.writeFile('itens.json', JSON.stringify(itens, null, 2), (err) => {
      if (err) {
        console.error('Erro ao escrever no arquivo JSON:', err);
        res.status(500).send('Erro ao salvar o item.');
      } else {
        res.status(200).send('Item salvo com sucesso.');
      }
    });
  });
});

// Iniciar o servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
