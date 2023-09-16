import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Style
import './style.css'

// Context
import { UserContext } from "../../context/UserContext.jsx";

const Dashboard = () => {
  const { user, clearUserContext } = useContext(UserContext);
  const navigate = useNavigate();

  console.log(user)

  const handleLogout = () => {
    console.log('logout clicked')
    localStorage.removeItem('token');
    clearUserContext()
    navigate('/login');
  }

  return (<>
    <div className='header'>
      <a href='/dashboard'>Dashboard</a>
      <p>Olá, {user.name}. Seja bem vindo novamente!</p>
      <button type='button' onClick={handleLogout}>Logout</button>
    </div>

    <div className="dashboard">

      <div className='content'>
        <h2>Devices</h2>

        <div className='devices'>
          <div className='device'>
            <h3>Device 1</h3>
            <p>Tipo: Soil Misture</p>
            <p>Umidade do Solo: 76%</p>
          </div>
          <div className='device'>
            <h3>Device 2</h3>
            <p>Tipo: Temperature</p>
            <p>Temperatura: 25°C</p>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Dashboard