import React from 'react';

function Spinner () {
  var styles = require("./Spinner.css");
  if(localStorage.getItem('isLogged')) {
    if(localStorage.getItem('motiveCss') === "cyberpunk") {
      styles = require("./SpinnerCyberpunk.css");
    }
  }
  
  return (<div className="waiting-spinner-container">
    <div className="waiting-spinner"></div>
  </div>)
}

export default Spinner;