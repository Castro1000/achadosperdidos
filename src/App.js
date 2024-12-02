import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import AddItemPage from './pages/AddItemPage'; // Importando a página de cadastro
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage'; // Importando a página de login
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Página de Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rota privada para HomePage */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />

          {/* Rotas com Header e Footer para outras páginas */}
          <Route
            path="/*"
            element={
              <>
                <Header />
                <div className="content-container">
                  <Routes>
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/UserPage" element={<UserPage />} />
                    <Route path="/add-item" element={<AddItemPage />} /> {/* Rota para a página de cadastro */}
                    <Route path="*" element={<NotFoundPage />} /> {/* Página 404 */}
                  </Routes>
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

// Componente PrivateRoute atualizado com Navigate
function PrivateRoute({ children }) {
  const loggedIn = sessionStorage.getItem('loggedIn') === 'true';

  // Se o usuário não estiver logado, redireciona para a página de login
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default App;
