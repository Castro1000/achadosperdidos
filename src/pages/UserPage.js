import React, { useState, useEffect } from 'react';
import './UserPage.css';

function UserPage() {
  const fixedItems = [
    {
      descricao: 'Mochila preta com livros',
      localizacao: 'Terminal 2',
      data_registro: '2024-01-10',
      observacoes: 'Mochila contém cadernos e uma garrafa d’água.',
      fotos: [
        'https://images.tcdn.com.br/img/img_prod/886231/mochila_para_laptop_preta_seanite_5077_1_f904ef6b83f3d242bf89acafccaab9e3_20231002114959.jpg',
        'https://m.media-amazon.com/images/I/31nRUCu5HqL._AC_.jpg'
      ],
    },
    {
      descricao: 'Guarda-chuva azul',
      localizacao: 'Terminal 2',
      data_registro: '2024-01-11',
      observacoes: 'Guarda-chuva está em bom estado.',
      fotos: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKix6DBpEWRzw0s3vTrHHGw5rqqtLF0q5VTg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBN8VZxw0Yyfv4NXb-ovC_EFomNG7BcGUavRWtxSjVM7IrVnC_RR5WYm76EVlIH7-CFSk&usqp=CAU'
      ],
    },
  ];

  const [itens, setItens] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('itens')) || [];
    setItens([...fixedItems, ...storedItems]);
  }, []);

  const handleImageClick = (foto) => {
    setSelectedImage(foto);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearItems = () => {
    if (window.confirm("Tem certeza que deseja limpar o banco de itens?")) {
      localStorage.removeItem('itens');
      setItens([...fixedItems]);
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filteredItens = itens.filter(item => {
    const itemDate = new Date(item.data_registro);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchesDateRange =
      (!start || itemDate >= start) && (!end || itemDate <= end);

    const matchesSearchQuery = item.descricao
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesDateRange && matchesSearchQuery;
  });

  const sortedItens = [...filteredItens].sort((a, b) => new Date(b.data_registro) - new Date(a.data_registro));

  return (
    <div className="user-page-container">
      <h2 className="user-page-title">Itens Cadastrados</h2>
      <h5 className="user-page-title">
        Caso encontre seu objeto, ligue 3512-9090 ou dirija-se ao terminal cadastrado
      </h5>

      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar por descrição"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        <br></br>
        <br></br>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="date-input"
          placeholder="Data Inicial"
        />
        <p className='periodo' >pesquisa por período</p>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="date-input"
          placeholder="Data Final"
        />
      </div>

      {sortedItens.length === 0 ? (
        <p className="no-items-message">Não há itens cadastrados.</p>
      ) : (
        <div className="card-container">
          {sortedItens.map((item, index) => (
            <div className="card" key={index}>
              <h3 className="card-title">{item.descricao}</h3>
              <p className="card-info"><strong>Local de retirada:</strong> {item.localizacao}</p>
              <p className="card-info"><strong>Data de Registro:</strong> {item.data_registro}</p>
              <p className="card-info"><strong>Observações:</strong> {item.observacoes}</p>

              <div className="card-images">
                {item.fotos.map((foto, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={foto}
                    alt={`Item ${index} - Imagem ${imgIndex}`}
                    className="item-image"
                    onClick={() => handleImageClick(foto)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="fullscreen-modal" onClick={handleClose}>
          <img src={selectedImage} alt="Fullscreen" className="fullscreen-image" />
          <button className="close-button" onClick={handleClose}>
            Voltar
          </button>
        </div>
      )}
    </div>
  );
}

export default UserPage;
