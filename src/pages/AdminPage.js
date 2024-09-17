import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.css';

function AdminPage() {
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [dataRegistro, setDataRegistro] = useState('');
  const [contato, setContato] = useState('');
  const [fotos, setFotos] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparar dados para envio com FormData
    const formData = new FormData();
    formData.append('descricao', descricao);
    formData.append('localizacao', localizacao);
    formData.append('data_registro', dataRegistro);
    formData.append('contato', contato);
    
    // Adicionar todas as fotos ao FormData
    fotos.forEach((foto) => {
      formData.append('fotos', foto);
    });

    try {
      console.log('Enviando dados:', {
        descricao,
        localizacao,
        data_registro: dataRegistro,
        contato,
        fotos: fotos.map(foto => URL.createObjectURL(foto)), // Convertendo para URLs locais para simulação
      });

      // Enviar dados para o backend usando FormData
      await axios.post('http://192.168.15.23:3308/api/registros', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setMessage('Item cadastrado com sucesso!');
      // Limpar campos após o envio
      setDescricao('');
      setLocalizacao('');
      setDataRegistro('');
      setContato('');
      setFotos([]);
    } catch (error) {
      console.error('Erro ao cadastrar item:', error);
      setMessage('Erro ao cadastrar item. Tente novamente.');
    }
  };

  const handleFileChange = (e) => {
    setFotos([...e.target.files]);
  };

  return (
    <div className="admin-page">
      <h2 className="admin-page__title">Página de Administração</h2>
      <p className="admin-page__subtitle">
        Bem-vindo à página de administração. Aqui você pode cadastrar os itens perdidos e encontrados.
      </p>

      <form onSubmit={handleSubmit} className="admin-page__form">
        <div className="form-group">
          <label htmlFor="descricao">Descrição do Item:</label>
          <input
            type="text"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="localizacao">Local onde foi encontrado:</label>
          <input
            type="text"
            id="localizacao"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="data_registro">Data:</label>
          <input
            type="date"
            id="data_registro"
            value={dataRegistro}
            onChange={(e) => setDataRegistro(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contato">Informações de Contato:</label>
          <input
            type="text"
            id="contato"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fotos">Fotos do Item:</label>
          <input
            type="file"
            id="fotos"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="form-control"
          />
          <small className="form-text">Você pode adicionar até 4 fotos.</small>
        </div>

        <button type="submit" className="btn btn-primary">Cadastrar Item</button>
      </form>

      {message && <p className="success-message">{message}</p>}
    </div>
  );
}

export default AdminPage;
