import './styles.css'

import background from '../../assets/images/background.png'
import family from '../../assets/images/family.svg'
import contact from '../../assets/images/contact.svg'
import address from '../../assets/images/address.svg'
import hiFive from '../../assets/images/hi-five.svg'

function Instituto() {
  return (
    <div id="institute-page" style={{ backgroundImage: `url(${background})` }}>
      <div id="about" className='container'>
        <div className='container-left'>
          <h1>Sobre o instituto</h1>
          <p>o Instituto da Criança do Hospital das Clínicas é considerado centro de referência nacional em saúde da criança e atende pacientes do Sistema Único de Saúde e de operadoras de planos de saúde (Saúde Suplementar).</p>
        </div>
        <div className='container-right'>
          <img src={family} alt="Família" />
        </div>
      </div>

      <div id="contact" className='container'>
        <div className='container-left'>
          <img src={contact} alt="Contato" />
        </div>
        <div className='container-right'>
          <h1>Contato</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, voluptatibus!</p>
        </div>
      </div>

      <div id="address" className='container'>
        <div className='container-left'>
          <h1>Endereço</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, consequuntur.</p>
        </div>
        <div className='container-right'>
          <img src={address} alt="Endereço" />
        </div>
      </div>

      <div id="other" className='container'>
        <div className='container-left'>
          <img src={hiFive} alt="Hi Five" />
        </div>
        <div className='container-right'>
          <h1>Lorem</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas.</p>
        </div>
      </div>
    </div>
  )
}

export default Instituto