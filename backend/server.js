const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');

const app = express();
const port = 3001;

// Configuração do multer para upload de arquivos
const upload = multer({ dest: 'uploads/' });

const connection = mysql.createConnection({
  host: '192.168.1.129',
  user: 'root',
  password: '',
  database: 'achadosperdidos',
  port: 3308 // Certifique-se de que a porta está correta
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/registros', upload.array('fotos', 4), (req, res) => {
  const { descricao, localizacao, data_registro, contato } = req.body;

  // Adicionar lógica para salvar as informações no banco de dados
  const query = 'INSERT INTO registros (descricao, localizacao, contato, data_registro) VALUES (?, ?, ?, ?)';
  
  connection.query(query, [descricao, localizacao, contato, data_registro], (error, results) => {
    if (error) {
      console.error('Erro ao salvar no banco de dados:', error);
      return res.status(500).json({ message: 'Erro ao salvar no banco de dados.' });
    }
    
    // Salvar os caminhos das fotos se necessário
    req.files.forEach(file => {
      console.log('Arquivo enviado:', file.filename);
      // Lógica para salvar o caminho do arquivo no banco de dados
    });

    res.status(200).json({ message: 'Item cadastrado com sucesso!' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
