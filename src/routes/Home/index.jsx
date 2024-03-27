import { Link } from 'react-router-dom'
import './styles.css'

import institute from '../../assets/images/institute.svg'
import exams from '../../assets/images/exams.svg'
import kids from '../../assets/images/kids.svg'

function Home() {
  return (
    <div id="home-page">
      <Link to="/Instituto">
        <section id="instituto" style={{ backgroundImage: `url(${institute})` }}>
          <h2>O Instituto</h2>
          <div className='info'>
            <p>Veja como entrar em contato com o instituto, localização e mais informações!</p>
          </div>
        </section>
      </Link>
      <Link to="/Exames">
        <section id="exames" style={{ backgroundImage: `url(${exams})` }}>
          <h2>Sobre Exames</h2>
          <div className='info'>
            <p>Saiba como funciona, quais os preparativos e para quê serve um exame!</p>
          </div>
        </section>
      </Link>
      <Link to="/AreaKids">
        <section id="area-kids" style={{ backgroundImage: `url(${kids})` }}>
          <h2>Área Kids</h2>
          <div className='info'>
            <p>Inclua o paciente no processo, diminuindo a ansiedade e medo dele!</p>
          </div>
        </section>
      </Link>
    </div>
  )
}

export default Home