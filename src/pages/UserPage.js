import React, { useState, useEffect } from 'react';
import './UserPage.css'; // Arquivo CSS para estilos

const UserPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // Filtro por categoria
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = () => {
    // Filtra os itens com base no termo de pesquisa e na categoria selecionada
    const results = items.filter(item => 
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
      (selectedCategory === 'all' || item.category === selectedCategory)
    );
    setFilteredItems(results);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Mock de dados - você pode substituir isso com uma chamada real à API
  useEffect(() => {
    setItems([
      { id: 1, name: 'Documento 1', category: 'document' },
      { id: 2, name: 'Objeto 1', category: 'object' },
      { id: 3, name: 'Outro 1', category: 'other' },
      // Adicione mais itens conforme necessário
    ]);
  }, []);

  return (
    <div className="user-page-container">
      <h2>Pesquisar Itens Perdidos</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Digite o nome do item..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="all">Todas as Categorias</option>
          <option value="document">Documentos</option>
          <option value="object">Objetos</option>
          <option value="other">Outros</option>
        </select>
        <button onClick={handleSearch}>Pesquisar</button>
      </div>
      <div className="results-container">
        {filteredItems.length > 0 ? (
          <ul>
            {filteredItems.map(item => (
              <li key={item.id}>{item.name}</li>
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
