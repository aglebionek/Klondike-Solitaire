import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import Pagination from "./Pagination";
import "./Stats.css";
import axios from 'axios';


function GlobalStats() {
    const [statsList, setStatsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(20);

   
        useEffect(() => {
            setLoading(true);
            axios.get("http://localhost:3000/stats/getStats").then((resp) => {
              const { data } = resp;
              setStatsList(data);
              setLoading(false);
            });
          }, []);
  
        
  

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = statsList.slice(indexOfFirstPost,indexOfLastPost);
    const [numberOfButtons, setNumberOfButoons] = useState(
      Math.ceil(statsList.length / postPerPage)
    );
      
    const minus = (pageNumber) => {
      if (currentPage === 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  }
  const plus = (pageNumber) => {
    if (currentPage === 8 ) {
    setCurrentPage(currentPage);
  } else {
    setCurrentPage(currentPage + 1);
  }
}
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="App">
      <h1>Statystyki</h1>
		  <table cellSpacing="0" cellPadding="0" border="0" style={{width: "100%"}}>
		    <thead>
		      <tr id="header">
		        <td width="40%" align="left">
		          Gracz
		        </td>
		        <td width="30%" align="center">
              Ranking
		        </td>
		        <td width="30%" align="center" id="header">
             	W/D/L
		        </td>
          </tr>
        </thead>
      </table>
      <Posts statsList={currentPosts} loading={loading}/>
      <Pagination postPerPage={postPerPage} totalPosts={statsList.length} paginate={paginate} minus={minus} plus={plus}/>
        
    </div>
    
    );	
		
    
  
}

export default GlobalStats;