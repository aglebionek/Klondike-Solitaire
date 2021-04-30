import React,{useState} from 'react';
import Axios from "axios";
import "./Login.css";


function Login (){

  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')

  const [loginStatus,setLoginStatus]=useState('')
  const login =() =>{
    Axios.post('http://localhost:3001/login',{
      username: username,
      password: password,
    
    }).then((response)=>{
      if(response.data.message)
      {
        setLoginStatus(response.data.message);
      }
      else
      {
        setLoginStatus("Witaj "+response.data[0].username)
      }
    })
  }

  return (
    <div>
    <header className="header"> Logowanie </header>  
    <div id="container">
        <input type="text" placeholder="Nazwa użytkownika" onChange = {(e)=>{
          setUsername(e.target.value);
        }}          
        />      
		<input type="password" placeholder="Hasło" onChange = {(e)=>{
          setPassword(e.target.value);
        }} />
    </div>
    <div id="container">
        <button type="button" className="button" onClick={login}>Zaloguj się</button>
        <button type="button" className="button">Zarejestruj się</button>
    </div>
    <p>{loginStatus}</p>
    <div id="container">
        <p><a href="default.asp" target="_blank">Nie pamiętasz hasła?</a></p>
    </div>
    </div>
  )
}
export default Login;

