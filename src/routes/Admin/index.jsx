import { useState } from 'react';
import './styles.scss'
import TextField from '../../components/TextField';
import { Link } from 'react-router-dom';
import ButtonDefault from '../../components/ButtonDefault';

function Admin() {
  const [isLogon, setIsLogon] = useState(false);

  const [loginData, setLoginData] = useState({ login: '', password: '' });

  function handleLoginData() {
    const login = document.querySelector('#login').value;
    const password = document.querySelector('#password').value;

    setLoginData({ login, password });
  }

  function handleLogin() {
    alert(loginData);
  }

  return (
    <div id='admin-page' show-login={(!isLogon).toString()}>
      {
        !isLogon ? (
          <div id='login-info'>
            <h1>Administração Login</h1>
            <div className='fields'>
              <TextField id='login' placeholder='Login' onChange={handleLoginData}></TextField>
              <TextField id='password' placeholder='Senha' onChange={handleLoginData}></TextField>
            </div>
            <ButtonDefault text="Entrar" onClick={handleLogin} />
            <Link to='/'>Voltar para o site</Link>
          </div>
        ) : (
          <h1>não</h1>
        )
      }
    </div>
  )
}

export default Admin;