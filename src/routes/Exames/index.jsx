import { useState } from 'react'

import './styles.css'

import TextField from '../../components/TextField'
import Exam from '../../components/Exam'

function Exames() {
  const listExams = [
    {
      title: 'Hemograma',
      about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, expedita.'
    },
    {
      title: 'Raio X',
      about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, explicabo.'
    }
  ];

  const [examsFiltered, setExamsFiltered] = useState(listExams);

  function handleFindExam(event) {
    setExamsFiltered(listExams.filter(e => e.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())));
  }

  return (
    <div id='exams-page'>
      <h1>Exames</h1>
      <div className='find'>
        <TextField id="find-exam" placeholder="Localizar Exame" big="true" onChange={handleFindExam} />
      </div>
      <div id="exams-lines">
        {
          examsFiltered.length === 0
            ? <h2>Nenhum exame localizado</h2>
            : examsFiltered.map((e, i) => {
              return (
                <Exam key={i} title={e.title} about={e.about} />
              )
            })
        }
      </div>
    </div>
  )
}

export default Exames