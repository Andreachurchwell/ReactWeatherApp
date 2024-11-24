import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyProvider from './hooks/contextHook.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import Registration from './Components/Registration/Registration.jsx'
import Weather from './Components/Weather/Weather.jsx'
// import Weather2 from './Components/Weather/Weather.jsx'
createRoot(document.getElementById('root')).render(



  <StrictMode>

    <MyProvider>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<App />} />

          <Route path='/register' element={<Registration />} />

          <Route element={<ProtectedRoute />}>
            


            <Route path='/weather' element={<Weather />} />
            {/* <Route path='/weather' element={<Weather2 />} /> */}





          </Route>

        </Routes>


      </BrowserRouter>

    </MyProvider>
  </StrictMode>



)
