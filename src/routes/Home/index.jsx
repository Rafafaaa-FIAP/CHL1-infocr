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
          <img src={institute} alt='Instituto' />
          <div className='info'>
            <p>Veja como entrar em contato com o instituto, localização e mais informações!</p>
          </div>
        </section>
      </Link>
      <Link to="/Exames">
        <section id="exames" style={{ backgroundImage: `url(${exams})` }}>
          <h2>Sobre Exames</h2>
          <img src={exams} alt='Exames' />
          <div className='info'>
            <p>Saiba como funcionam, para que servem e os preparativos para realização dos exames!</p>
          </div>
        </section>
      </Link>
      <Link to="/AreaKids">
        <section id="area-kids" style={{ backgroundImage: `url(${kids})` }}>
          <h2>Área Kids</h2>
          <img src={kids} alt='Crianças' />
          <div className='info'>
            <p>Diga adeus à ansiedade e ao medo, a inclusão do paciente é o segredo!</p>
          </div>
        </section>
      </Link>
    </div>
  )
}

export default Home