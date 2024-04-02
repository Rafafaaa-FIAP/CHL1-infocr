import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import './styles.css'

import listExams from '../../data/exams'

import areaKids from '../../assets/images/area-kids.png'

function AreaKids() {
  const { exam } = useParams();
  const selectedExam = listExams.find(e => e.title === exam);

  return (
    <div id="area-kids-page">
      <div className='header'>
        <div className="logo">
          <img src={areaKids} alt='Área Kids' />
        </div>
        <div id="general-infos">
          <div className='general-infos-item'>
            <h2>Dicas para se divertir durante os exames</h2>
            <ul>
              <li>Leve um brinquedo ou livro para se distrair.</li>
              <li>Imagine que você está em um lugar mágico e divertido.</li>
              <li>Respire fundo e relaxe.</li>
              <li>Converse com o médico se tiver alguma dúvida ou medo.</li>
            </ul>
          </div>
          <div className='general-infos-item'>
            <h2>Lembre-se</h2>
            <ul>
              <li>Os exames são rápidos e seguros.</li>
              <li>Eles ajudam os médicos a cuidar da sua saúde.</li>
              <li>Você não está sozinho! Muitas crianças já fizeram esses exames e se divertiram.</li>
            </ul>
          </div>
        </div>
      </div>
      <h2>Com essas dicas, você estará pronto para viver grandes aventuras no mundo dos exames!</h2>
      {
        !!selectedExam
          ?
          <div id="exam-infos">
            <div className='texts'>
              <h2>O que é {selectedExam.title}?</h2>
              <ul>
                {
                  selectedExam.ludicInfos.map((e, i) => {
                    return (
                      <li key={i}>{e}</li>
                    )
                  })
                }
              </ul>
            </div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/infocr"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="Vídeo YouTube"
              allowFullScreen
            />
          </div>
          :
          <Link to="/Exames">Selecione um Exame</Link>
      }
    </div>
  )
}

export default AreaKids