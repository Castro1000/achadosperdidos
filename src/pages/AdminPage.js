import React, { useState } from 'react';
import './AdminPage.css'; // Importando o CSS externo

function AdminPage() {
  const [item, setItem] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [photos, setPhotos] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar os dados do formulário e fotos para um servidor ou banco de dados
    console.log({ item, location, date, contactInfo, photos });

    // Limpa os campos após o envio
    setItem('');
    setLocation('');
    setDate('');
    setContactInfo('');
    setPhotos([]);
    setMessage('Item cadastrado com sucesso!');
  };

  const handleFileChange = (e) => {
    setPhotos([...e.target.files]);
  };

  return (
    <div className="admin-page">
      <h2 className="admin-page__title">Página de Administração</h2>
      <p className="admin-page__subtitle">
        Bem-vindo à página de administração. Aqui você pode cadastrar os itens perdidos e encontrados.
      </p>

      <form onSubmit={handleSubmit} className="admin-page__form">
        <div className="form-group">
          <label htmlFor="item">Descrição do Item:</label>
          <input
            type="text"
            id="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Local onde foi encontrado:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Data:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactInfo">Informações de Contato:</label>
          <input
            type="text"
            id="contactInfo"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="photos">Fotos do Item:</label>
          <input
            type="file"
            id="photos"
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
