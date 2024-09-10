const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

// Configuração do middleware CORS
app.use(cors());

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Adiciona timestamp ao nome do arquivo
  }
});
const upload = multer({ storage });

// Configuração da conexão com o banco de dados
//473702ab5104.sn.mynetname.net
const connection = mysql.createConnection({
  host: '473702ab5104.sn.mynetname.net',
  user: 'root',
  password: '',
  database: 'achadosperdidos',
  port: 3308
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

// Endpoint para criar um novo registro
app.post('/api/registros', upload.array('photos', 4), (req, res) => {
  const { descricao, localizacao, data_registro, contato } = req.body;
  
  const query = 'INSERT INTO registros (descricao, localizacao, contato, data_registro) VALUES (?, ?, ?, ?)';

  connection.query(query, [descricao, localizacao, contato, data_registro], (error, results) => {
    if (error) {
      console.error('Erro ao salvar no banco de dados:', error);
      return res.status(500).json({ message: 'Erro ao salvar no banco de dados.' });
    }

    const registroId = results.insertId;

    // Verifica se foram enviadas fotos
    if (req.files && req.files.length > 0) {
      const insertPhotosQuery = 'INSERT INTO fotos (registro_id, caminho_foto) VALUES ?';
      const photoData = req.files.map(file => [registroId, `/uploads/${file.filename}`]);

      connection.query(insertPhotosQuery, [photoData], (photoError) => {
        if (photoError) {
          console.error('Erro ao salvar fotos no banco de dados:', photoError);
          return res.status(500).json({ message: 'Erro ao salvar fotos no banco de dados.' });
        }
      });
    }

    res.status(200).json({ message: 'Item cadastrado com sucesso!' });
  });
});

// Endpoint para buscar todos os registros
app.get('/api/registros', (req, res) => {
  const query = 'SELECT * FROM registros';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erro ao buscar registros:', error);
      return res.status(500).json({ message: 'Erro ao buscar registros.' });
    }

    res.json(results);
  });
});

// Novo endpoint para atualizar o status de entrega e data de entrega
app.put('/api/registros/:id', (req, res) => {
  const { id } = req.params;
  const { entregue, data_entrega } = req.body;

  const query = 'UPDATE registros SET entregue = ?, data_entrega = ? WHERE id = ?';

  connection.query(query, [entregue, data_entrega, id], (error, results) => {
    if (error) {
      console.error('Erro ao atualizar o registro:', error);
      return res.status(500).json({ message: 'Erro ao atualizar o registro.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Registro não encontrado.' });
    }

    res.status(200).json({ message: 'Status de entrega atualizado com sucesso.' });
  });
});

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
