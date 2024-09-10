import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './UserPage.css'; // Certifique-se de que o caminho está correto

const UserPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deliveryDates, setDeliveryDates] = useState({}); // Armazena a data de entrega por item

  // Função para buscar os itens do backend
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3308/api/registros');
      setItems(response.data);
      setFilteredItems(response.data); // Inicialmente mostrar todos
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

  // Função para filtrar os itens
  const handleFilter = useCallback(() => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.data_registro).toISOString().split('T')[0]; // Formata a data do item para "yyyy-MM-dd"
        return itemDate === filterDate;
      });
    }

    setFilteredItems(filtered);
  }, [items, searchTerm, filterDate]);

  useEffect(() => {
    handleFilter();
  }, [searchTerm, filterDate, handleFilter]);

  // Função para marcar um item como entregue
  const markAsDelivered = async (itemId) => {
    const deliveryDate = deliveryDates[itemId]; // Pega a data armazenada para o item

    if (deliveryDate) {
      try {
        await axios.put(`http://localhost:3308/api/registros/${itemId}`, {
          entregue: true,
          data_entrega: deliveryDate
        });

        // Atualizar os itens após a alteração
        fetchItems();
      } catch (error) {
        console.error('Erro ao marcar item como entregue:', error);
        setError('Erro ao marcar item como entregue.');
      }
    }
  };

  // Função para atualizar a data de entrega
  const handleDeliveryDateChange = (itemId, date) => {
    setDeliveryDates((prevDates) => ({
      ...prevDates,
      [itemId]: date, // Atualiza a data específica para o item
    }));
  };

  return (
    <div className="user-page-container">
      <h2>Itens Cadastrados</h2>

      {/* Filtros */}
      <div className="filter-container">
        <input 
          type="text"
          placeholder="Filtrar por descrição"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input"
        />
        <input 
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="filter-input"
        />
        <button onClick={handleFilter} className="filter-button">Filtrar</button>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <div className="results-container">
        {filteredItems.length > 0 ? (
          <div className="card-grid">
            {filteredItems.map((item) => (
              <div className="card" key={item.id}>
                <div className="card-content">
                  <p><strong>Descrição:</strong> {item.descricao}</p>
                  <p><strong>Localização:</strong> {item.localizacao}</p>
                  <p><strong>Data de Registro:</strong> {new Date(item.data_registro).toLocaleDateString()}</p>
                  <p><strong>Contato:</strong> {item.contato}</p>

                  {/* Verificação se o item já foi entregue */}
                  {item.entregue ? (
                    <p className="delivered">Entregue em: {new Date(item.data_entrega).toLocaleDateString()}</p>
                  ) : (
                    <>
                      {/* Exibir input de data e botão para marcar como entregue */}
                      <input 
                        type="date" 
                        value={deliveryDates[item.id] || ''} 
                        onChange={(e) => handleDeliveryDateChange(item.id, e.target.value)} 
                        className="delivery-date-input"
                      />
                      <button onClick={() => markAsDelivered(item.id)} className="mark-delivered-button">
                        Confirmar Entrega
                      </button>
                    </>
                  )}
                </div>
                <div className="card-images">
                  {item.fotos && JSON.parse(item.fotos).map((photo, index) => (
                    <img key={index} src={`http://localhost:3308/uploads/${photo}`} alt={`Foto ${index + 1}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhum item encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
