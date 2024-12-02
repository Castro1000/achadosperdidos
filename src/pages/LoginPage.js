import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Importa o CSS específico para a página de login
import logo from './logo.png';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar se é admin
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const navigate = useNavigate();

  // Verifica se o usuário já está logado ao carregar a página
  useEffect(() => {
    if (sessionStorage.getItem('loggedIn') === 'true') {
      navigate('/'); 
    }
  }, [navigate]);

  
  const generateRandomId = () => {
    return Math.floor(100000 + Math.random() * 900000); 
  };

  // Função para registrar um novo usuário
  const handleRegister = () => {
    const newUser = {
      id: generateRandomId(),
      name,
      email,
      birthdate,
      password: registerPassword,
    };

  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

 
    setEmail('');
    setBirthdate('');
    setRegisterPassword('');
    setShowRegisterModal(false);

    alert('Cadastro realizado com sucesso! Você pode agora fazer login com suas credenciais.');
  };

  // Função para fazer login com os dados fornecidos
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Verifica se o login é de admin
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('loggedIn', 'true');
      setIsAdmin(true); // Define que o usuário é admin
      navigate('/admin'); // Redireciona para a página de administração (AdminPage)
    } 
    // Verifica se o login é de João
    else if (username === 'joao@gmail.com' && password === '1234') {
      sessionStorage.setItem('loggedIn', 'true');
      setIsAdmin(false); // Define que o usuário não é admin
      navigate('/UserPage'); // Redireciona para a página UserPage
    } 
    // Verifica se o login é de Maria
    else if (username === 'marias@gmail.com' && password === '1234') {
      sessionStorage.setItem('loggedIn', 'true');
      setIsAdmin(false); // Define que o usuário não é admin
      navigate('/UserPage'); // Redireciona para a página UserPage
    } 
    // Verifica login de usuário cadastrado
    else {
      const user = users.find(u => u.email === username && u.password === password);
      if (user) {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('userId', user.id);
        setIsAdmin(false); // Define que o usuário não é admin
        navigate('/UserPage');
      } else {
        alert('Credenciais inválidas');
      }
    }
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
      <p className="login-description">
        Bem-vindo ao sistema de Achados e Perdidos dos Terminais de Ônibus de Manaus. Encontre e registre objetos perdidos de forma rápida e eficiente (Para registrar um item encontrado, procure um terminal de ônibus para o cadastro!).
      </p>

      {/* Modal de Registro */}
      {showRegisterModal && (
        <div className="modal-overlay">
          <div className="register-modal">
            <h3>Cadastro de Novo Usuário</h3>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="register-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
            />
            <input
              type="date"
              placeholder="Data de Nascimento"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
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
    </div>
  );
}

export default LoginPage;