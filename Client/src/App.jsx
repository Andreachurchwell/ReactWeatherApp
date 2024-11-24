import { useState } from 'react'
import Weather from './Components/Weather/Weather'
import './App.css'
import Login from './Components/Login/Login'
function App() {


  return (
    <>
      <div className='app'>

{console.log('import.env==', import.meta.env.REACT_APP_ID)}

        <Login />




      </div>
    </>
  )
}

export default App
