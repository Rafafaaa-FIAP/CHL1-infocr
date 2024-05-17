import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { checkIsSigned, logIn, logOut, getExams, createExam } from '../../hooks/useExams';

import './styles.scss';

import TextField from '../../components/TextField';
import ButtonDefault from '../../components/ButtonDefault';
import Alert, { showAlert } from '../../components/Alert';

function Admin() {
  const [isSigned, setIsSigned] = useState(checkIsSigned());
  const [loginData, setLoginData] = useState(null);

  const [examsList, setExamsList] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [examData, setExamData] = useState(returnEmptyExamData());

  refreshExams()

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

  function refreshExams() {
    getExams().then((res) => {
      const exams = [];
      Object.keys(res).forEach(id => {
        const obj = res[id];
        obj['id'] = id;
        exams.push(obj);
      });

      setExamsList(exams);
    })
  }

  function toggleExamModal(firstTime) {
    setShowModal(!showModal);

    if (!showModal) {
      setExamData(returnEmptyExamData());
    }
  }

  function returnEmptyExamData() {
    return {
      id: "",
      about: "",
      cantDo: ["",""],
      ludicInfos: ["",""],
      preparations: ["",""],
      title: "",
      videoLink: ""
    };
  }

  function addField(type) {
    const obj = examData;
    obj[type].push("");
    setExamData(obj);
    console.log(obj);
  }

  function handleExamData() {

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
          <div id='exams-list'>
            <div className='table-info'>
              <table>
                <thead>
                  <tr>
                    <td>Nome</td>
                    <td>Sobre</td>
                    <td>Ações</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    examsList.map((e) => {
                      return (
                        <tr key={e.id}>
                          <td>{e.title}</td>
                          <td>{e.about}</td>
                          <td className='row-actions'>
                            <div>
                              <i className="bi bi-pencil-fill"></i>
                              <i className="bi bi-trash3-fill"></i>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              <ButtonDefault text="Novo Exame" onClick={toggleExamModal} />
              <div id="exam-modal" className={showModal ? 'display-flex' : 'display-none'}>
                <div className="modal">
                  <div className="modal-header">
                    <h2>Novo Exame</h2>
                    <button className="modal-close-button" title="Fechar" onClick={toggleExamModal}>
                      <i className="bi bi-x-circle-fill"></i>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div>
                      <TextField id='exam-name' placeholder='Nome' onChange={handleExamData}></TextField>
                      <TextField id='exam-about' placeholder='Sobre' onChange={handleExamData}></TextField>
                      <TextField id='exam-video' placeholder='Link Vídeo' onChange={handleExamData}></TextField>
                      <div className='fields-add'>
                        {
                          examData.preparations.map((e, i) => {
                            return (
                              <TextField id={`exam-prep-${i}`} placeholder={`Preparativo ${i+1}`} onChange={handleExamData} key={i}></TextField>
                            )
                          })
                        }
                        <button className='button-add-field' onClick={() => {addField('preparations')}}>
                          <i className="bi bi-plus-circle-fill"></i>
                        </button>
                      </div>
                      <div className='fields-add'>
                      {
                        examData.cantDo.map((e, i) => {
                          return (
                            <TextField id={`exam-cant-${i}`} placeholder={`O que não fazer ${i+1}`} onChange={handleExamData} key={i}></TextField>
                          )
                        })
                      }
                        <button className='button-add-field' onClick={() => {addField('cantDo')}}>
                          <i className="bi bi-plus-circle-fill"></i>
                        </button>
                      </div>
                      <div className='fields-add'>
                      {
                        examData.ludicInfos.map((e, i) => {
                          return (
                            <TextField id={`exam-cant-${i}`} placeholder={`Informação Lúdica ${i+1}`} onChange={handleExamData} key={i}></TextField>
                          )
                        })
                      }
                        <button className='button-add-field' onClick={() => {addField('ludicInfos')}}>
                          <i className="bi bi-plus-circle-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <ButtonDefault id="create" text="Cadastrar" onClick={handleLogin} />
                    <ButtonDefault id="update" text="Alterar" onClick={handleLogin} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Admin;