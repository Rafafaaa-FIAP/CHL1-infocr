import { useState } from 'react';
import './styles.scss'
import { Link } from 'react-router-dom';

function Exam(props) {
  const [shown, setShown] = useState(!!props.shown);

  return (
    <div className={'exam' + (shown ? ' shown ' : '')}>
      <div className='exam-header' onClick={!!props.onClick ? props.onClick : () => { setShown(!shown); }}>
        <i className="bi bi-caret-right-fill"></i>
        <h2>{props.title}</h2>
      </div>
      <div className='infos'>
        <div className='infos-item'>
          <h3>O que é?</h3>
          <p>{props.about}</p>
        </div>
        <div className='infos-item'>
          <h3>Preparativos</h3>
          <ul>
            {
              props.preparations.map((e, i) => {
                return (
                  <li key={i}>{e}</li>
                )
              })
            }
          </ul>
        </div>
        <div className='infos-item'>
          <h3>O que NÃO fazer</h3>
          <ul>
            {
              props.cantDo.map((e, i) => {
                return (
                  <li key={i}>{e}</li>
                )
              })
            }
          </ul>
        </div>
        <Link to={"/AreaKids/" + props.title}>Ver na Área Kids</Link>
      </div>
    </div>
  )
}

export default Exam