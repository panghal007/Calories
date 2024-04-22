import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../UserContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      console.log(response);
      // const { user, token } = response.data;
      
      // // Extract username from user data
      
      // const { username } = user;

      // // console.log(token);
      // login(username);
      // localStorage.setItem('token', token);
      // window.location.href='/dashboard'
      if (response.status === 200) {
        // Handle successful login
        console.log(response.data);
        const { user, token } = response.data;
        const dataToStore = {
          userData: user,
          token: token
        };
        // Store user data and token in local storage
        localStorage.setItem('Data', JSON.stringify(dataToStore));
        
        // Perform login using context
         login(user.username);
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error, e.g., show error message to the user
    }
  };

  return (
    <div className="login--container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>

        <p>Not a User</p>
        <Link to="/">Register</Link>
      </form>
    </div>
  );
};

export default Login;
