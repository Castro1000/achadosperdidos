import React, { useState } from 'react';

function FoundItemForm() {
  const [item, setItem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar o item encontrado para o backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item Encontrado:
        <input 
          type="text" 
          value={item} 
          onChange={(e) => setItem(e.target.value)} 
        />
      </label>
      <button type="submit">Cadastrar Item</button>
    </form>
  );
}

export default FoundItemForm;
