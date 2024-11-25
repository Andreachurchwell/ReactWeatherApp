import React, { useState } from 'react'
import axios from 'axios'
import './login.css'
import { useData } from '../../hooks/contextHook'
import Registration from '../Registration/Registration'
import { useNavigate, useLocation } from 'react-router-dom'
import Louie from '../../assets/catIcon.png'
import L2 from '../../assets/L2.jpg'
const Login = () => {

  const [login, setLogin] = useState({})

  const navigate = useNavigate()
  const { handleLoggedInUser } = useData()

  const [error, setError] = useState('')

  const location = useLocation()



  const handleChange = (e) => {
    setLogin(login => (
      {
        ...login,
        [e.target.name]: e.target.value
      }
    ))
  }


  // const handleLogin = (e) => {
  //   e.preventDefault()
  //   console.log('handleLogin hit')
  //   axios({
  //     method: 'post',
  //     url: 'http://localhost:3002/api/login',
  //     data: login,
  //     withCredentials: true

  //   })
  //     .then((res) => {
  //       console.warn('res.data==', res.data)
  //       handleLoggedInUser(res.data.found)
  //       navigate('/weather')
  //       // console.warn('res.body==', res.body)
  //     })
  //     .catch(err => console.log(err))
  // }

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('handleLogin hit');
    axios({
      method: 'post',
      url: 'http://localhost:3002/api/login',
      data: login,
      withCredentials: true,
    })
      .then((res) => {
        console.warn('res.data==', res.data);
        if (res.data.token) {
          handleLoggedInUser(res.data.found);
          navigate('/weather');
        } else {
          setError('Login unsuccessful. Please check your username and password.')
        }
      })
      .catch((err) => {
        console.log(err);
        setError('An error occurred during login. Please try again later.')
      });
  };



  const handleRegisterRedirect = () => {
    navigate('/register');
  };





  return (
    <div>
      <div id='mainLogin'>
        {console.log('login hit', login)}
        <div id='loginCont'>
          {/* <img src={Louie} alt=""id='lou' /> */}
          <img src={L2} alt=""id='lou' />
      <h4>Louie's Forecast</h4>

          {/* <h4>Login</h4> */}
          <input type="text" placeholder='username' name="username" onChange={(e) => handleChange(e)} />
          <br /><br /> {error && <p className="error-message">{error}</p>}
          <input type="text" placeholder='password' name="password" onChange={(e) => handleChange(e)} />
          <br /><br />
          <button className='button' onClick={(e) => handleLogin(e)}>Login</button>
          <br /><br /><br />
          <h4>Or To Register</h4>
          <button className='button' onClick={handleRegisterRedirect}>Register Here</button>

        </div>
      </div>
    </div>
  )
}

export default Login
