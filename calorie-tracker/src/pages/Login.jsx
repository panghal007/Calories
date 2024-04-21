import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  
  const handleSubmit = async (e) =>{
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:5000/api/v1/login', { email, password });
      localStorage.setItem('token', response.data.token);
      window.location.href='/dashboard'
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error, e.g., show error message to the user
    }
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
            {/* <Link to='/dashboard'><button type='submit'>Login</button></Link> */}
            <button type='submit'>Login</button>
            
            <p>Not a User</p>
            <Link to='/'>Register</Link>
        </form>
        
    </div>
  )
}

export default Login