import { useState } from 'react';
import './styles.css'

function Exam(props) {
  const [shown, setShown] = useState(!!props.shown);

  return (
    <div className={'exam' + (shown ? ' shown ' : '')}>
      <div className='exam-header' onClick={() => { setShown(!shown); }}>
        <i className="bi bi-caret-right-fill"></i>
        <h2>{props.title}</h2>
      </div>
      <div className='infos'>
        <div className='infos-item'>
          <h3>O que é</h3>
          <p>{props.about}</p>
        </div>
        <div className='infos-item'>
          <h3>Preparativos</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, pariatur.</p>
        </div>
      </div>
    </div>
  )
}

export default Exam