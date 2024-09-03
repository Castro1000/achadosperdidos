import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserPage.css'; // Certifique-se de que o caminho está correto

const UserPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Defina a API_URL no escopo do componente
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'; 

  // Função para buscar itens do backend
  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/registros`);
      setItems(response.data);
    } catch (error) {
      console.error('Erro ao buscar registros:', error);
      setError('Erro ao buscar registros.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="user-page-container">
      <h2>Itens Cadastrados</h2>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <div className="results-container">
        {items.length > 0 ? (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <p><strong>Descrição:</strong> {item.descricao}</p>
                <p><strong>Localização:</strong> {item.localizacao}</p>
                <p><strong>Data de Registro:</strong> {new Date(item.data_registro).toLocaleDateString()}</p>
                <p><strong>Contato:</strong> {item.contato}</p>
                {/* Renderização das fotos */}
                {Array.isArray(item.fotos) ? (
                  item.fotos.map((photo, index) => (
                    <img key={index} src={`${API_URL}/uploads/${photo}`} alt={`Foto ${index + 1}`} />
                  ))
                ) : (
                  item.fotos && JSON.parse(item.fotos).map((photo, index) => (
                    <img key={index} src={`${API_URL}/uploads/${photo}`} alt={`Foto ${index + 1}`} />
                  ))
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum item encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
