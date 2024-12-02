import React, { useState } from 'react';
import axios from 'axios';
import './AddItemPage.css'; // Certifique-se de que o caminho está correto

const AddItemPage = () => {
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [dataRegistro, setDataRegistro] = useState('');
  const [contato, setContato] = useState('');
  const [fotos, setFotos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('descricao', descricao);
    formData.append('localizacao', localizacao);
    formData.append('data_registro', dataRegistro);
    formData.append('contato', contato);

    fotos.forEach(foto => {
      formData.append('fotos', foto);
    });

    try {
      await axios.post('http://192.168.43.220:3308/api/registros', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Item cadastrado com sucesso!');
      
      // Limpar o formulário após o sucesso
      setDescricao('');
      setLocalizacao('');
      setDataRegistro('');
      setContato('');
      setFotos([]);
    } catch (error) {
      console.error('Erro ao cadastrar item:', error);
      alert('Erro ao cadastrar item. Tente novamente.');
    }
  };

  return (
    <div className="add-item-page-container">
      <h2>Cadastrar Novo Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="descricao">Descrição:</label>
          <input
            type="text"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="localizacao">Localização:</label>
          <input
            type="text"
            id="localizacao"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="data_registro">Data de Registro:</label>
          <input
            type="date"
            id="data_registro"
            value={dataRegistro}
            onChange={(e) => setDataRegistro(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contato">Contato:</label>
          <input
            type="text"
            id="contato"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="fotos">Fotos:</label>
          <input
            type="file"
            id="fotos"
            onChange={(e) => setFotos([...e.target.files])}
            multiple
            accept="image/*"
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default AddItemPage;
