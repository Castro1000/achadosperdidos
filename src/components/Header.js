import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Usando react-router-dom para navegação
import './Header.css'; // Arquivo CSS para estilos

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`header-container ${menuOpen ? 'menu-open' : ''}`}>
      {/* Menu de navegação com link para UserPage */}
      <nav className={`navigation-menu ${menuOpen ? 'navigation-menu--open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        {/* <Link to="/UserPage" onClick={() => setMenuOpen(false)}>Pesquisar</Link> Alterado para UserPage */}
      </nav>

      {/* Menu hambúrguer para dispositivos móveis */}
      <div className={`hamburger-menu ${menuOpen ? 'hamburger-menu--active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Redireciona para a página inicial ao clicar na logo */}
      <Link to="/" className="logo-link">
        <img src="novo.png" alt="Logo" className="logo-image10" />
      </Link>
    </header>
  );
};

export default Header;
