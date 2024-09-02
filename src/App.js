import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Renderiza o Header somente se não estiver na HomePage */}
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                {/* Não renderiza o Header na HomePage */}
                <HomePage />
              </>
            } 
          />
          <Route 
            path="/*" 
            element={
              <>
                <Header />
                <Routes>
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/UserPage" element={<UserPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
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
