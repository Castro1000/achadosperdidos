import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import AddItemPage from './pages/AddItemPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Renderiza o Header apenas se a rota não for /login */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Header /> {/* Header renderizado apenas em rotas privadas */}
              </PrivateRoute>
            }
          />
        </Routes>
        
        {/* As rotas abaixo vão renderizar o Header nas páginas internas */}
        <div className="content-container">
          <Routes>
            <Route
              path="/admin"
              element={<AdminPage />}
            />
            <Route
              path="/UserPage"
              element={<UserPage />}
            />
            <Route
              path="/add-item"
              element={<AddItemPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

// Componente PrivateRoute atualizado para verificar o login e só exibir a página interna
function PrivateRoute({ children }) {
  const loggedIn = sessionStorage.getItem('loggedIn') === 'true';

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default App;
