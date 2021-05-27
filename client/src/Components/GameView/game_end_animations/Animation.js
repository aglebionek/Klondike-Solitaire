import React from "react";
import styles from "./Animation.css";
import Rain from './rain'
import Firework from './firework';
import Fog from './fog';



function Animation({action}){

    if(action === 'win'){
        return(
            <div className="animation-background-black-win">
                <Firework />
                    <div className="animation-container">
                            <div className="animation-win-box">
                                <ul>
                                    <li>W</li>
                                    <li>Y</li>
                                    <li>G</li>
                                    <li>R</li>
                                    <li>A</li>
                                    <li>Ł</li>
                                    <li>E</li>
                                    <li>Ś</li>
                                </ul>
                            </div>
                    </div>
            </div>
        )
    }
    else if(action==='draw')
    {
       return (
           
            <div className="animation-background-black">
            <Fog/>
                    <div class="animation-container">
                            <div className="animation-win-box">
                                <ul>
                                    <li>R</li>
                                    <li>E</li>
                                    <li>M</li>
                                    <li>I</li>
                                    <li>S</li>
                                </ul>
                            </div>
                    </div>
                    
            </div>
        )  
    }
    else if(action==='lose')
    {
        return (
            <div className="animation-background-black"> 
            <div className="rain-background"><Rain /></div>
                    <div class="animation-container">
                   
                            <div className="animation-win-box">
                                <ul>
                                    <li>P</li>
                                    <li>R</li>
                                    <li>Z</li>
                                    <li>E</li>
                                    <li>G</li>
                                    <li>R</li>
                                    <li>A</li>
                                    <li>Ł</li>
                                    <li>E</li>
                                    <li>Ś</li>
                                </ul>
                            </div>
                    </div>
            </div>
        )
    }
    else{
        return( <></>)
    }
}

export default Animation;  