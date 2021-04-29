import React from "react"

const [usernameReg,setUsernameReg]=useState('')
const [passwordReg,setPasswordReg]=useState('')
const [emailReg,setEmailReg]=useState('')
function Form(){
    return (
        <div id="container">
        <input type="text" placeholder="Nazwa użytkownika" onChange={(e)=>{
            setUsernameReg(e.target.value);
        }} />
        <input type="email" placeholder="E-mail" onChange={(e)=>{
            setEmailReg(e.target.value);
        }}  />
		<input type="password" placeholder="Hasło" />
        <input type="password" placeholder="Powtórz hasło" onChange={(e)=>{            
            setPasswordReg(e.target.value);
        }}  />
        </div>
    )
}


export default Form; usernameReg; passwordReg; emailReg;
