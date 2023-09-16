import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Authorization Middleware
import PrivateRoute from '../auth/PrivateRoute.jsx'

import Home from '../pages/Home/index.jsx'
import Login from '../pages/Login/index.jsx'
import Register from '../pages/Register/index.jsx'
import Dashboard from '../pages/Dashboard/index.jsx'

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route path='*' element={<h1>Página não encontrada</h1>} />
    </Routes>
  </BrowserRouter>
)

export default AppRoutes