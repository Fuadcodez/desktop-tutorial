import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/signUp'
import { Routes, Route, Navigate } from 'react-router'
const url = import.meta.env.VITE_URL
function App() {
  const [local, setLocal] = useState(null) 
  useEffect(() =>{
    const userToken = localStorage.getItem('todoUser')? JSON.parse(localStorage.getItem('todoUser')) : null
    if (userToken) setLocal(userToken)
  }, [])
  return (
  <Routes>
    <Route path='/' element={local ? <Home local={local} setLocal={setLocal}/>: <Navigate to='/login'/>} />
    <Route path='/login' element={local ? <Navigate to='/'/>: <Login setLocal={setLocal}/>} />
    <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default App
