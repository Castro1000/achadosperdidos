import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

          {/* Redireciona para a tela de login se o usuário não estiver autenticado */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />

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
                    <Route path="*" element={<NotFoundPage />} />
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

function PrivateRoute({ children }) {
  const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
  return loggedIn ? children : <LoginPage />;
}

export default App;
