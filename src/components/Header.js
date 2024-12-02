import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação
import './Header.css'; // Arquivo CSS para estilos

const Header = () => {
  const navigate = useNavigate(); // Inicializando useNavigate
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Lógica de logout
    sessionStorage.setItem('loggedIn', 'false'); // Limpa o estado de login
    console.log("Logout");
    
    // Redireciona para a página de login
    navigate('/login'); // Redireciona para a LoginPage
  };

  return (
    <header className={`header-container ${menuOpen ? 'menu-open' : ''}`}>
      {/* Redireciona para a página inicial ao clicar na logo */}
      <Link to="/Admin" className="logo-link"> 
        <img src="novo.png" alt="Logo" className="logo-image10" />
      </Link>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      {/* Menu de navegação com link para UserPage */}
      <nav className={`navigation-menu ${menuOpen ? 'navigation-menu--open' : ''}`}>
        <Link to="/UserPage" onClick={() => setMenuOpen(false)}>Página de Pesquisa</Link>
      </nav>

      {/* Menu hambúrguer para dispositivos móveis */}
      <div className={`hamburger-menu ${menuOpen ? 'hamburger-menu--active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Header;
