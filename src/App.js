import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import AddItemPage from './pages/AddItemPage'; // Importando a página de cadastro
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Renderiza o Header e o Footer em todas as páginas, exceto na HomePage */}
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage /> // Renderiza apenas a HomePage sem Header e Footer
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

export default App;
