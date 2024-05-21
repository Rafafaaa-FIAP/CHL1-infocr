import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { checkIsSigned, logIn, logOut, getExams, addExam, updateExam, removeExam } from '../../hooks/useExams';

import './styles.scss';

import TextField from '../../components/TextField';
import ButtonDefault from '../../components/ButtonDefault';
import Alert, { showAlert } from '../../components/Alert';

function Admin() {
  const [isSigned, setIsSigned] = useState(true /*checkIsSigned()*/);
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

    if (!invalid) {
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

  function toggleExamModal(examID) {
    setShowModal(!showModal);

    if (!!examID) {
      setExamData(examsList.find(e => e.id === examID));
    }
    else {
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
    setExamData({
      id: obj.id,
      about: obj.about,
      cantDo: obj.cantDo,
      ludicInfos: obj.ludicInfos,
      preparations: obj.preparations,
      title: obj.title,
      videoLink: obj.videoLink
    });
  }

  function removeField(type, index) {
    const obj = examData;
    if (obj[type].length === 1) {
      showAlert('Não é possível remover todos os campos!', 'error');
    }
    else {
      obj[type].splice(index, 1);
      setExamData({
        id: obj.id,
        about: obj.about,
        cantDo: obj.cantDo,
        ludicInfos: obj.ludicInfos,
        preparations: obj.preparations,
        title: obj.title,
        videoLink: obj.videoLink
      });
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

  function handleSendExam() {
    const title = document.querySelector('#exam-name');

    let invalid = false;

    if (title.checkValidity()) {
      title.classList.remove('invalid');
    }
    else {
      title.classList.add('invalid');
      invalid = true;
    }

    if (!invalid) {
      const objSend = {
        "about": examData.about,
        "cantDo": examData.cantDo,
        "ludicInfos": examData.ludicInfos,
        "preparations": examData.preparations,
        "title": examData.title,
        "videoLink": examData.videoLink
      };

      if (!examData.id) {
        addExam(objSend);
        showAlert('Exame adicionado!', 'success');
      }
      else {
        updateExam(examData.id, objSend);
        showAlert('Exame alterado!', 'success');
      }

      toggleExamModal();
    }
    else {
      showAlert('Dados inválidos!', 'error');
    }
  }

  function handleRemoveExam(examID) {
    Swal.fire({
      title: 'Deseja realmente remover este exame?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      confirmButtonColor: getComputedStyle(document.body).getPropertyValue('--colors-semantic-success-base'),
      denyButtonText: 'Não',
      denyButtonColor: getComputedStyle(document.body).getPropertyValue('--colors-semantic-error-base'),
    }).then((result) => {
      if (result.isConfirmed) {
        removeExam(examID);
        showAlert('Exame removido!', 'success');
      }
    });
  }

  function handleLogOut() {
    logOut().then(() => {
      setIsSigned(checkIsSigned());
    });
  }

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
                              <button onClick={() => { toggleExamModal(e.id) }}>
                                <i className="bi bi-pencil-fill"></i>
                              </button>
                              <button onClick={() => {  handleRemoveExam(e.id) }}>
                                <i className="bi bi-trash3-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              <div id='general-buttons'>
                <ButtonDefault text="Novo Exame" onClick={() => { toggleExamModal() }} />
                <ButtonDefault text="Sair" onClick={handleLogOut} />
              </div>
              <Link to='/'>Voltar para o site</Link>
            </div>

            <div id="exam-modal" className={showModal ? 'display-flex' : 'display-none'}>
              <div className="modal">
                <div className="modal-header">
                  <h2>{!examData.id ? 'Novo Exame' : 'Alterar Exame'}</h2>
                  <button className="modal-close-button" title="Fechar" onClick={() => { toggleExamModal() }}>
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
                              <TextField id={`exam-prep-${i}`} className="exam-prep" placeholder={`Preparativo ${i + 1}`} onChange={handleExamData}></TextField>
                              <button className='button-remove-field' onClick={() => { removeField('preparations', i) }}>
                                <i className="bi bi-trash3-fill"></i>
                              </button>
                            </div>
                          )
                        })
                      }
                      <button className='button-add-field' onClick={() => { addField('preparations') }}>
                        <i className="bi bi-plus-circle-fill"></i>
                      </button>
                    </div>
                    <div className='fields-add'>
                      {
                        examData.cantDo.map((e, i) => {
                          return (
                            <div className='field-with-remove' key={i}>
                              <TextField id={`exam-cant-${i}`} className="exam-cant" placeholder={`O que não fazer ${i + 1}`} onChange={handleExamData}></TextField>
                              <button className='button-remove-field' onClick={() => { removeField('cantDo', i) }}>
                                <i className="bi bi-trash3-fill"></i>
                              </button>
                            </div>
                          )
                        })
                      }
                      <button className='button-add-field' onClick={() => { addField('cantDo') }}>
                        <i className="bi bi-plus-circle-fill"></i>
                      </button>
                    </div>
                    <div className='fields-add'>
                      {
                        examData.ludicInfos.map((e, i) => {
                          return (
                            <div className='field-with-remove' key={i}>
                              <TextField id={`exam-ludic-${i}`} className="exam-ludic" placeholder={`Informação Lúdica ${i + 1}`} onChange={handleExamData}></TextField>
                              <button className='button-remove-field' onClick={() => { removeField('ludicInfos', i) }}>
                                <i className="bi bi-trash3-fill"></i>
                              </button>
                            </div>
                          )
                        })
                      }
                      <button className='button-add-field' onClick={() => { addField('ludicInfos') }}>
                        <i className="bi bi-plus-circle-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  {
                    !examData.id ? (
                      <ButtonDefault text="Adicionar" onClick={handleSendExam} />
                    ) : (
                      <ButtonDefault text="Alterar" onClick={handleSendExam} />
                    )
                  }
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