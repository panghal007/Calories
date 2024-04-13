import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
