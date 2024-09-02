import React from 'react';
import './HomePage.css'; // Importando o CSS externo

function HomePage() {
  const handleRegisterClick = () => {
    window.location.href = '/admin'; // Navega para a página Admin
  };

  const handleSearchClick = () => {
    window.location.href = '/UserPage'; // Navega para a página User
  };

  return (
    <div className="home-page">
      <header className="home-page__header">
        <div className="home-page__banner">
          <h1 className="home-page__title">Achados e Perdidos</h1>
          <p className="home-page__subtitle">Bem-vindo ao sistema de Achados e Perdidos dos terminais de ônibus.</p>
        </div>
      </header>

      <section className="home-page__content">
        <div className="home-page__text">
          <p>
            Nosso objetivo é ajudar você a encontrar seus itens perdidos. Se encontrou algum objeto, 
            por favor, registre-o para que possamos devolvê-lo ao dono.
          </p>
          <p>
            Se perdeu algo, você pode procurar nos itens registrados e entrar em contato conosco para recuperá-lo.
          </p>
        </div>
        <div className="home-page__actions">
          <button className="home-page__button home-page__button--register" onClick={handleRegisterClick}>Registrar Item Encontrado</button>
          <button className="home-page__button home-page__button--search" onClick={handleSearchClick}>Procurar Item Perdido</button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
