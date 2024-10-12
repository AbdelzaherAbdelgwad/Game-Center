import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import Signup from './signup';
import axios from 'axios';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, setSignUp] = useState(false);

  const checkValidation = async ()=>{
    try {
      const response = await axios.post('http://localhost:9191/loginAccounts/checkValidation', {
        username:username,
        password:password
      });
      return response.data;
        
    } catch (error) {
        console.error("Error posting data:", error);
        return false
    }

}

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  async function  handleSubmit(e) {
    try{
      const isValid = await checkValidation();
    e.preventDefault();
    if(signUp){
      return null
    }
   if (isValid) {
      localStorage.setItem("Login", 'true');
      localStorage.setItem("Username", username);

      onLogin(true);
      navigate('/home');
    } else {
      localStorage.setItem("Login", 'false');
      onLogin(false);
      alert("Wrong username or password");
    }
    }catch{

    }
    
  }

  function handleSignUp() {
    setSignUp(true)
  }
  function setAccountInfo(singed) {
    
    setSignUp(singed)

  }
 
  return (
    <div >
    {!signUp?
    
        <div className='loginContainer'>
          <h1>Login</h1>
          <div className='loginInputsDiv'>
            <h2>Username</h2>
            <input className="inputLogin" name='username' placeholder='Username' onChange={handleChange} value={username} />
            <h2>Password</h2>
            <input className="inputLogin" type='password' name='password' placeholder='Password' onChange={handleChange} value={password} />
          </div>
          <button className='btn' onClick={handleSubmit}>Login</button>
          <button className='btn' onClick={handleSignUp}>Sign up</button>
        </div>

      :<Signup signData={setAccountInfo}/>}
      <footer> - Crafted with love, by Abdelzaher Abdelgwad -</footer>
    </div>
    
    
  );
}