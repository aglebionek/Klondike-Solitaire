import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import "./Stats.css";
import axios from 'axios';


function GlobalStats() {
    const [statsList, setStatsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setPageMaxNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

   
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

    const handleClick = (event) =>{
      setCurrentPage(Number(event.target.id));
    }

    const pages =[];
    for (let i = 1; i <= Math.ceil(statsList.length/postPerPage);i++) {
      pages.push(i);
    }

    const renderPageNumbers = pages.map((number) => {
      if(number <maxPageNumberLimit + 1 && number>minPageNumberLimit)
      {
        return (
          <li key={number} id={number} onClick={handleClick} className={currentPage === number ? "active" : null}>
            {number}
          </li>
        )
      }
      else {
        return null;
      }
    });
      
    
  
  
   

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    
    if(currentPage + 1 > maxPageNumberLimit)
    {
      setPageMaxNumberLimit(maxPageNumberLimit+pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit+pageNumberLimit);
    }
  }

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    
    if((currentPage - 1) % pageNumberLimit === 0)
    {
      setPageMaxNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }

  let pageIncrementBtn = null;
  if(pages.length > maxPageNumberLimit){
    pageIncrementBtn=<li onClick={handleNextBtn}> &hellip; </li>
  }

  let pageDecrementBtn = null;
  if(pages.length >= 1){
    pageDecrementBtn=<li onClick={handlePrevBtn}> &hellip; </li>
  }


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
      <ul className="pageNumbers">
        <li>
          <button 
            onClick={handlePrevBtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            Poprzednia
          </button>
        </li>
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
        <li>
          <button 
            onClick={handleNextBtn}
            disabled={currentPage === pages[pages.length-1] ? true : false}
          >
            Następna
          </button>
        </li>
      </ul>
    </div>
    
    );	
		
    
  
}

export default GlobalStats;