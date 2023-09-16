import React from 'react';
import SmartPlant from '../../assets/smartPlant.png'
import './styles.css'

const Home = () => {

  return (
    <>
      <div className='body'>

        <div className='middle'>
          <div className='title'>
            <p>Monitor</p>
            <p>Para</p>
            <p>Planta</p>
            <p>Inteligente</p>
          </div>
          <img src={SmartPlant} alt="planta inteligente imagem" />


        </div>
        <div className='button-login'>
          <div className='button-login-container'>
            <a href="/login">Entrar Agora</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home