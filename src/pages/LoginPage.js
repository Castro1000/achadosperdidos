import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from './logo.png';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [email, setEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('loggedIn') === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const generateRandomId = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleRegister = () => {
    const newUser = {
      id: generateRandomId(),
      name: email,
      email,
      password: registerPassword,
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setEmail('');
    setRegisterPassword('');
    setShowRegisterModal(false);

    alert('Cadastro realizado com sucesso! Você pode agora fazer login com suas credenciais.');
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('loggedIn', 'true');
      setIsAdmin(true);
      navigate('/admin');
    } else {
      const user = users.find(u => u.email === username && u.password === password);
      if (user) {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('userId', user.id);
        navigate('/UserPage');
      } else {
        alert('Credenciais inválidas');
      }
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPasswordModal(false);
    alert(`Um link de redefinição de senha foi enviado para o e-mail: ${forgotPasswordEmail}`);
    setForgotPasswordEmail('');
  };

  return (
    <div className="login-container1">
      <h2>Conect-Busca</h2>
      <br />
      <img src={logo} alt="Achados e Perdidos" className="login-logo" />
      <input
        type="text"
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input2"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input2"
      />
      <button onClick={handleLogin} className="login-button2">Login</button>
      <button onClick={() => setShowRegisterModal(true)} className="register-button">Cadastrar</button>
      <button
        onClick={() => setShowForgotPasswordModal(true)}
        className="forgot-password-button"
      >
        Esqueci minha senha
      </button>
      <p className="login-description">
        Bem-vindo ao sistema de Achados e Perdidos dos Terminais de Ônibus de Manaus. Encontre e registre objetos perdidos de forma rápida e eficiente (Para registrar um item encontrado, procure um terminal de ônibus para o cadastro!).
      </p>

      {/* Modal de Registro */}
      {showRegisterModal && (
        <div className="modal-overlay">
          <div className="register-modal">
            <h3>Cadastro de Novo Usuário</h3>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
            />
            <input
              type="password"
              placeholder="Senha"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="register-input"
            />
            <button onClick={handleRegister} className="save-button">Salvar</button>
            <button onClick={() => setShowRegisterModal(false)} className="cancel-button">Cancelar</button>
          </div>
        </div>
      )}

      {/* Modal de Esqueci minha senha */}
      {showForgotPasswordModal && (
        <div className="modal-overlay2">
          <div className="forgot-password-modal2">
            <h3>Redefinir senha</h3>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              className="forgot-password-input2"
            />
            <button onClick={handleForgotPassword} className="send-link-button2">
              Enviar link
            </button>
            <button
              onClick={() => setShowForgotPasswordModal(false)}
              className="cancel-button2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
