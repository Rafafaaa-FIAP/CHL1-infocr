import './styles.css'

import background from '../../assets/images/background.png'
import backgroundMobile from '../../assets/images/background-mobile.png'
import family from '../../assets/images/family.svg'
import contact from '../../assets/images/contact.svg'
import address from '../../assets/images/address.svg'
import hiFive from '../../assets/images/hi-five.svg'
import googleMaps from '../../assets/images/google-maps.png'

function Instituto() {
  return (
    <div id="institute-page" style={{ backgroundImage: `url(${window.innerWidth > 600 ? background : backgroundMobile})` }}>
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
          <span>
            <b>ICr Instituto da Criança e do Adolescente</b>
            <p>(11) 2661-8500</p>
            <b>Marcação de consultas – de 2ª a 6ª feira</b>
            <p>ICr – (11) 2661-8635, das 7:00 às 16:00</p>
            <p>ITACI – (11) 2661-8962 ou (11) 2661-8963, das 14:00 às 16:00</p>
            <b>Agendamento de exames – de 2ª a 6ª feira</b>
            <p>(11) 2661-8548 ou (11) 2661-8670 ou pessoalmente no 2º andar do ICr – das 11:00 às 15:00</p>
          </span>
        </div>
      </div>

      <div id="address" className='container'>
        <div className='container-left'>
          <span className='flex'>
            <a href='https://www.google.com/maps?q=Av.+Dr.+Enéas+Carvalho+de+Aguiar,+647+-+Cerqueira+César' target='_blank'>
              <img src={googleMaps} alt="Google Maps" id="google-maps" />
            </a>
            <h1>Endereço</h1>
          </span>
          <p>Av. Dr. Enéas Carvalho de Aguiar, 647 - Cerqueira César, São Paulo - SP, 05403-000</p>
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
          <h1>Mais Informações</h1>
          <p>Acesse o site oficial clicando <a href='https://icr.usp.br/' target='_blank'>aqui</a></p>
        </div>
      </div>
    </div>
  )
}

export default Instituto