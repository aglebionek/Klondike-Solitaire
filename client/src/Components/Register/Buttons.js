import React from "react"
import Axios from "axios"
import {usernameReg,passwordReg,emailReg} from "./Form.js"

const register = () => {
    Axios.post('https://localhost3001/register', {username: usernameReg,
     email: emailReg, 
     password: passwordReg }).then((response)=>{
         console.log(response);
     })
}
function Buttons(){
    return (
        <div id="container">
        <button type="button">Mam już konto</button>
        <button type="button">Zarejestruj się</button>
        </div>
    )
}

export default Buttons; register;