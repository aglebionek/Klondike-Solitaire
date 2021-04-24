import React from 'react';
import ReactDOM from 'react-dom';
import Caption from "./login/Caption.js"
import Form from "./login/Form.js"
import Buttons from "./login/Buttons.js"
import ForgetPassword from "./login/ForgetPassword.js"
function View (){
  return (
    <div>
    <Caption />
    <Form />
    <Buttons />
    <ForgetPassword />
    </div>
  )
}
ReactDOM.render(<View />,document.getElementById("root"));

