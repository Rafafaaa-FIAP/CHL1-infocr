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

  useEffect(() => {
    if (showModal) {
      const id = examData.id;
      document.querySelector('#exam-name').value = examData.title;
      document.querySelector('#exam-about').value = examData.about;
      document.querySelector('#exam-video').value = examData.videoLink;
      examData.preparations.forEach((e, i) => {
        document.querySelector(`#exam-prep-${i}`).value = e;
      });
      examData.cantDo.forEach((e, i) => {
        document.querySelector(`#exam-cant-${i}`).value = e;
      });
      examData.ludicInfos.forEach((e, i) => {
        document.querySelector(`#exam-ludic-${i}`).value = e;
      });
    }
  }, [examData])

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

  function toggleExamModal() {
    setShowModal(!showModal);

    if (!showModal) {
      setExamData(returnEmptyExamData());
    }
  }

  function returnEmptyExamData() {
    return {
      id: "",
      about: "",
      cantDo: [""],
      ludicInfos: [""],
      preparations: [""],
      title: "",
      videoLink: ""
    };
  }

  function addField(type) {
    const obj = examData;
    obj[type].push("");
    setExamData(obj);
  }

  function removeField(type, index) {
    const obj = examData;
    if (obj[type].length === 1) {
      showAlert('Não é possível remover todos os campos!', 'error');
    }
    else {
      console.log(index);
      obj[type].splice(index, 1);
      setExamData(obj);
    }
  }

  function handleExamData() {
    const id = examData.id;
    const title = document.querySelector('#exam-name').value;
    const about = document.querySelector('#exam-about').value;
    const videoLink = document.querySelector('#exam-video').value;
    const preparations = [];
    document.querySelectorAll('.exam-prep').forEach((e) => {
      preparations.push(e.value);
    });
    const cantDo = [];
    document.querySelectorAll('.exam-cant').forEach((e) => {
      cantDo.push(e.value);
    });
    const ludicInfos = [];
    document.querySelectorAll('.exam-ludic').forEach((e) => {
      ludicInfos.push(e.value);
    });

    setExamData({ id, about, cantDo, ludicInfos, preparations, title, videoLink });
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
              <ButtonDefault text="Novo Exame" onClick={() => {toggleExamModal()}} />
              <div id="exam-modal" className={showModal ? 'display-flex' : 'display-none'}>
                <div className="modal">
                  <div className="modal-header">
                    <h2>Novo Exame</h2>
                    <button className="modal-close-button" title="Fechar" onClick={() => {toggleExamModal()}}>
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
                              <div className='field-with-remove' key={i}>
                                <TextField id={`exam-prep-${i}`} className="exam-prep" placeholder={`Preparativo ${i+1}`} onChange={handleExamData}></TextField>
                                <button className='button-remove-field' onClick={() => {removeField('preparations', i)}}>
                                  <i className="bi bi-trash3-fill"></i>
                                </button>
                              </div>
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
                            <div className='field-with-remove' key={i}>
                              <TextField id={`exam-cant-${i}`} className="exam-cant" placeholder={`O que não fazer ${i+1}`} onChange={handleExamData}></TextField>
                              <button className='button-remove-field' onClick={() => {removeField('cantDo', i)}}>
                                <i className="bi bi-trash3-fill"></i>
                              </button>
                            </div>
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
                            <div className='field-with-remove' key={i}>
                              <TextField id={`exam-ludic-${i}`} className="exam-ludic" placeholder={`Informação Lúdica ${i+1}`} onChange={handleExamData}></TextField>
                              <button className='button-remove-field' onClick={() => {removeField('ludicInfos', i)}}>
                                <i className="bi bi-trash3-fill"></i>
                              </button>
                            </div>
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