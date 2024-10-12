import React, {  useState } from 'react';
import './login.css';
import axios from 'axios';

export default function Signup({signData}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const addAccountDB = async ()=>{
        try {
                const response = await axios.post('http://localhost:9191/loginAccounts/addAccount', {
                username:username,
                email:email,
                password:password
            });
            console.log("account added");
            return response.data
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
      else if (name === "email") {
        setEmail(value);
      }
      else if (name === "confirmPassword") {
        setConfirmPassword(value);
      }
    }
  
   async function handleSubmit() {
    if(password === confirmPassword && password && email && username){
      const updated = await addAccountDB()
      console.log(updated)
      if(updated){
        await signData(false)
      }else{
        alert("account email or name already exists")
      }
    
    }}
  
    return (
        <div className='loginContainer'>
          <h1>Register</h1>
          <div className='loginInputsDiv'>
            <h2>Email</h2>
            <input className="inputLogin" name='email' placeholder='Email' onChange={handleChange} value={email} />
            <h2>Username</h2>
            <input className="inputLogin" name='username' placeholder='Username' onChange={handleChange} value={username} />
            <h2>Password</h2>
            <input className="inputLogin" type='password' name='password' placeholder='Password' onChange={handleChange} value={password} />
            <h2>Confirm password</h2>
            <input className="inputLogin" type='password' name='confirmPassword' placeholder='Confirm Password' onChange={handleChange} value={confirmPassword}/>
          </div>
          <button className='btn' onClick={()=>signData(null,null,null,false)}>Login</button>
          <button className='btn' onClick={handleSubmit}>Sign up</button>
        </div>
    );
}
