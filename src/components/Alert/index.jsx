import './styles.scss';

function Alert() {
  return (
    <div id="alert">
      <i className="bi"></i>
      <p></p>
    </div>
  )
}

export default Alert;

export function showAlert(message, type) {
  const alertElem = document.querySelector('#alert');
  const alertIcon = alertElem.querySelector('i');
  const alertText = alertElem.querySelector('p');
  
  alertElem.className = '';
  alertIcon.className = '';
  alertIcon.classList.add('bi');

  alertText.innerHTML = message;

  if (type === 'error') {
    alertElem.classList.add('error');
    alertIcon.classList.add('bi-x-circle');
  }
  else if (type === 'success') {
    alertElem.classList.add('success');
    alertIcon.classList.add('bi-check-circle');
  }
  else {
    alertIcon.classList.add('bi-exclamation-circle');
  }

  alertElem.classList.add('shown');
  setTimeout(() => {
    alertElem.classList.remove('shown');
    setTimeout(() => {
      alertText.innerHTML = '';
    }, 300);
  }, 3000);
}