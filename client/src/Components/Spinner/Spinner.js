import React from 'react';
import ThemeSelector from '../ThemeSelector/ThemeSelector';

function Spinner () {
  return (<div className="waiting-spinner-container">
    <div className="waiting-spinner"></div>
  </div>)
}

export default ThemeSelector(Spinner);