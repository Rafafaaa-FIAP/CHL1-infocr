import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { checkIsSigned, logIn, logOut, createExam } from '../../hooks/useExams';

import './styles.scss';

import TextField from '../../components/TextField';
import ButtonDefault from '../../components/ButtonDefault';
import Alert, { showAlert } from '../../components/Alert';

function Admin() {
  const [isSigned, setIsSigned] = useState(checkIsSigned());
  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    if (!isSigned) {
      setLoginData({ email: '', password: '' });
    }
  }, [isSigned]);

  function handleLoginData() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    setLoginData({ email, password });
  }

  function handleLogin() {
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    let invalid = false;

    if (email.checkValidity()) {
      email.classList.remove('invalid');
    }
    else {
      email.classList.add('invalid');
      invalid = true;
    }

    if (password.checkValidity()) {
      password.classList.remove('invalid');
    }
    else {
      password.classList.add('invalid');
      invalid = true;
    }

    if (!invalid){
      logIn(loginData.email, loginData.password).then((res) => {
        if (res === null) {
          showAlert('Login inválido!', 'error');
        }
        
        setIsSigned(checkIsSigned());
      });
    }
    else {
      showAlert('Dados inválidos!', 'error');
    }
  }

  function handlePost() {
    createExam();
  }

  function handleLogOut() {
    logOut().then(() => {
      setIsSigned(checkIsSigned());
    });
  }

  // function handleCheck() {
  //   setIsSigned(checkIsSigned());
  //   console.log(isSigned);
  // }

  return (
    <div id='admin-page' show-login={(!isSigned).toString()}>
      <Alert />
      {
        !isSigned ? (
          <div id='login-info'>
            <h1>Administração Login</h1>
            <div className='fields'>
              <TextField id='email' placeholder='E-mail' onChange={handleLoginData} type="email"></TextField>
              <TextField id='password' placeholder='Senha' onChange={handleLoginData} type="password"></TextField>
            </div>
            <ButtonDefault text="Entrar" onClick={handleLogin} />
            <Link to='/'>Voltar para o site</Link>
          </div>
        ) : (
          <h1>logado aparecer exames</h1>
        )
      }
    </div>
  )
}

export default Admin;