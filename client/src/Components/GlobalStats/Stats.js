import React, { useState, useEffect } from "react";
import "./Stats.css";
import Axios from "axios";

function GlobalStats() {
    const [id, setId] = useState("");
    const [nazwa, setNazwa] = useState("");
    const [ranking, setRanking] = useState("");
    const [wygrane, setWygrane] = useState("");
    const [remis, setRemis] = useState("");
    const [przegrane, setPrzegrane] = useState("");
    const [statsList, setStatsList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3000/example/test").then((resp) => {
            const {data} = resp;
            setStatsList(data)
        });
    }, [] );

  return (
    <div className="App">
      <h1>Statystyki</h1>
		<div>
		<table cellspacing="0" cellpadding="0" border="0" style={{width: "100%"}}>
		<tbody>
		<tr id="header">
		<td width="40%" align="center">
		Gracz
		</td>
		<td width="30%" align="center">
		Ranking
		</td>
		<td width="30%" align="center" id="header">
		W/D/L
		</td>
        </tr>
        
        </tbody>
		</table>
        </div>
        <div>
        {statsList.map((val) => {
            return (

                <div>
                <table>
                <tr>
                <td>{val.id}</td>
                <td>{val.nazwa}</td>
                <td>{val.ranking}</td>
                <td>{val.wygrane}/{val.remis}/{val.przegrane}</td>
                </tr>
                </table>
                </div>
           
            );
        })}
        </div>
		
		
	
    </div>
    
    );	
		
    
  
}

export default GlobalStats;