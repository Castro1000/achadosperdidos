import React, { useState } from 'react';
import './AdminPage.css';

// Função auxiliar para converter arquivos em base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function AdminPage() {
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [dataRegistro, setDataRegistro] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [fotos, setFotos] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Converter as fotos em base64
    const fotosBase64 = await Promise.all(Array.from(fotos).map(async (foto) => {
      return await convertToBase64(foto);
    }));

    // Salvar os dados no localStorage
    const item = {
      descricao,
      localizacao,
      data_registro: dataRegistro,
      observacoes,
      fotos: fotosBase64, // Armazenar as fotos como base64
    };

    const storedItems = JSON.parse(localStorage.getItem('itens')) || [];
    storedItems.push(item);
    localStorage.setItem('itens', JSON.stringify(storedItems));

    setMessage('Item cadastrado com sucesso!');

    // Limpar campos após o envio
    setDescricao('');
    setLocalizacao('');
    setDataRegistro('');
    setObservacoes('');
    setFotos([]);
  };

  const handleFileChange = (e) => {
    setFotos([...e.target.files]);
  };

  return (
    <div className="admin-page10">
      <h2 className="admin-page__title10">Página de Administração</h2>
      <p className="admin-page__subtitle10">
        Bem-vindo à página de administração. Aqui você pode cadastrar os itens perdidos e encontrados.
      </p>

      <form onSubmit={handleSubmit} className="admin-page__form10">
        <div className="form-group10">
          <label htmlFor="descricao">Descrição do Item:</label>
          <input
            type="text"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            className="form-control10"
            placeholder="Digite a descrição do item"
          />
        </div>

        <div className="form-group10">
          <label htmlFor="localizacao">Local de retirada:</label>
          <input
            type="text"
            id="localizacao"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            required
            className="form-control10"
            placeholder="Digite o local para retirar o item"
          />
        </div>

        <div className="form-group10">
          <label htmlFor="data_registro">Data de registro:</label>
          <input
            type="date"
            id="data_registro"
            value={dataRegistro}
            onChange={(e) => setDataRegistro(e.target.value)}
            required
            className="form-control10"
          />
        </div>

        <div className="form-group10">
          <label htmlFor="observacoes">Observações:</label>
          <textarea
            id="observacoes"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className="form-control10"
            rows="4"
            placeholder="Adicione suas observações aqui"
          />
        </div>

        <div className="form-group10">
          <label htmlFor="fotos">Adicionar imagem ou tirar a foto na hora:</label>
          <input
            type="file"
            id="fotos"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="form-control10"
          />
          <small className="form-text10">Você pode adicionar até 4 fotos.</small>
        </div>

        <button type="submit" className="btn btn-primary10">Cadastrar Item</button>
      </form>

      {message && <p className="success-message10">{message}</p>}
    </div>
  );
}

export default AdminPage;
