import React, { useState } from 'react'
import axios from 'axios'
import './Registration.css'
import { useNavigate } from 'react-router-dom'
import L2 from '../../assets/L2.jpg'

const Registration = () => {


  const [data, setData] = useState({})


  const navigate = useNavigate()



// USENAVIGATE


  const handleReg = (e) => {
      setData(data => (
          {
              ...data,
              [e.target.name]: e.target.value
          }
      ))
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      // console.log('handlesub hit')
      axios({
          method: 'post',
          url: 'http://localhost:3002/api/registration',
          data: data
      })
          .then((res) => {
              console.warn('res.data==', res.data)
              navigate('/')
              // console.warn('res.body==', res.body)
          })
          .catch(err => console.log(err))
  }


  return (
    <div id='m'>
              <div id='mainC'>
            {console.log('data===', data)}


            {/* <input/> */}
            {/* First Last email username password confirm password   submit button onchange handler for all 7 inputs*/}

            <form action="regForm" >
                <img src={L2} alt=""id='lou' />
                <h4>Registration Form</h4>
                <input type="text" name='first' placeholder='first' onChange={(e) => handleReg(e)} />
                <br /><br />
                <input type="text" name='last' placeholder='last' onChange={(e) => handleReg(e)} />
                <br /><br />
                <input type="text" name='username' placeholder='username' onChange={(e) => handleReg(e)} />
                <br /><br />
                <input type="text" name='email' placeholder='email' onChange={(e) => handleReg(e)} />
                <br /><br />
                <input type="text" name='password' placeholder='password' onChange={(e) => handleReg(e)} />
                <br /><br />
                <input type="text" name='confirm' placeholder='confirm' onChange={(e) => handleReg(e)} />
                <br /><br />
                <button className='button'onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
           

        </div>
    </div>
  )
}

export default Registration
