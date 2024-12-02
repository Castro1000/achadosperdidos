import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Importando o CSS externo

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('loggedIn');
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/admin'); // Navega para a página Admin
  };

  const handleSearchClick = () => {
    navigate('/UserPage'); // Navega para a página User
  };

  return (
    <div className="home-page">
      <header className="home-page__header">
        <div className="home-page__banner">
          <h1 className="home-page__title">Achados e Perdidos</h1>
          <p className="home-page__subtitle">
            Bem-vindo ao sistema de Achados e Perdidos dos terminais de ônibus de Manaus.
          </p>
        </div>
      </header>

      <nav className="home-page__menu">
        <ul>
          {isLoggedIn ? (
            <>
              <li><button onClick={handleRegisterClick}>Registrar Item</button></li>
              <li><button onClick={handleSearchClick}>Procurar Item</button></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li><button onClick={handleSearchClick}>Procurar Item</button></li>
          )}
        </ul>
      </nav>

      <section className="home-page__content">
        <p className="home-page__text">
          Nosso objetivo é ajudar você a encontrar seus itens perdidos. Se encontrou algum objeto, 
          por favor, registre-o para que possamos devolvê-lo ao dono.
        </p>
        <p className="home-page__text">
          Se perdeu algo, você pode procurar nos itens registrados e entrar em contato conosco para recuperá-lo.
        </p>
      </section>
    </div>
  );
}

export default HomePage;
