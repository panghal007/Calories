import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  
  const handleSubmit = async (e) =>{
    e.preventDefault()

    await axios.post('http://localhost:5000/api/v1/login',{email,password})
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }

  return (
    <div className='login--container'>
        <form onSubmit = {handleSubmit}>
            <div>
                <label>Email</label>
                <input 
                    name="email"
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label>Password</label>
                <input
                    name="password" 
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type='submit'>Login</button>
            
            <p>Not a User</p>
            <Link to='/'>Register</Link>
        </form>
        
    </div>
  )
}

export default Login