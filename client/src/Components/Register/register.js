import React,{useState} from 'react';
import Axios from "axios";
import "./register.css"
function Register (){
  const [usernameReg,setUsernameReg]=useState('')
  const [passwordReg,setPasswordReg]=useState('')
  const [emailReg,setEmailReg]=useState('')

  const register = () => {
    Axios.post('http://localhost:3001/register',{
      username: usernameReg,
      email: emailReg,
      password: passwordReg,
    }).then((response)=>{
      console.log(response)
    })
  }

  return (
    <div>
    <header className="header"> Rejestracja </header>
    <div id="container">
        <input type="text" placeholder="Nazwa użytkownika" onChange={(e)=>{
            setUsernameReg(e.target.value);
        }} />
        <input type="email" placeholder="E-mail" onChange={(e)=>{
            setEmailReg(e.target.value);
        }}  />
		
        <input type="password" placeholder="Hasło" onChange={(e)=>{            
            setPasswordReg(e.target.value);
        }}  />
    </div>
    <div id="container">
        <button type="button">Mam już konto</button>
        <button type="button" onClick={register}>Zarejestruj się</button>
    </div>
    </div>
  )
}
export default Register