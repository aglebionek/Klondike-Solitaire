import React from 'react';
import Caption from "./Caption.js";
import Form from "./Form.js";
import Buttons from "./Buttons.js";
import ForgetPassword from "./ForgetPassword.js";
import "./Login.css";


function Login (){
  return (
    <div>
      <Caption />
      <Form />
      <Buttons />
      <ForgetPassword />
    </div>
  )
}
export default Login;

