import { Link } from 'react-router-dom'
import './styles.css'

function Home() {
  return (
    <div id="home-page">
      <Link to="/Instituto">
        <section id="instituto">
          <h2>Sobre o instituto</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, dicta.</p>
        </section>
      </Link>
      <Link to="/Exames">
        <section id="exames">
          <h2>Exames</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, dicta.</p>
        </section>
      </Link>
      <Link to="/AreaKids">
        <section id="area-kids">
          <h2>Área Kids</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, dicta.</p>
        </section>
      </Link>
    </div>
  )
}

export default Home