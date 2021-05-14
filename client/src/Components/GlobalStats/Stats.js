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
              resp.className = "red"
              setStatsList(data);
              data.className="red";
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

  //sortowanie po nazwie rosnąco
  const sortByName = () => {

    axios.get("http://localhost:3000/stats/sortStatsByName").then((resp) => {
              const { data } = resp;
              setStatsList(data);
            });
          };

  //sortowanie po nazwie malejąco
  const sortByNameDesc = () => {

    axios.get("http://localhost:3000/stats/sortStatsByNameDesc").then((resp) => {
              const { data } = resp;
              setStatsList(data);
            });
          };

    ////sortowanie po rankingu rosnąco
    const sortByRank = () => {

    axios.get("http://localhost:3000/stats/sortStatsByRank").then((resp) => {
              const { data } = resp;
              setStatsList(data);
            });
          };


    ////sortowanie po rankingu malejąco
     const sortByRankDesc = () => {

     axios.get("http://localhost:3000/stats/sortStatsByRankDesc").then((resp) => {
              const { data } = resp;
              setStatsList(data);
            });
          };
    

      //sortowanie po wygranych rosnąco
      const sortByWins = () => {

     axios.get("http://localhost:3000/stats/sortStatsByWins").then((resp) => {
              const { data } = resp;
              setStatsList(data);
            });
          };


      //sortowanie po wygranych malejąco
      const sortByWinsDesc = () => {

     axios.get("http://localhost:3000/stats/sortStatsByWinsDesc").then((resp) => {
              const { data } = resp;
              setStatsList(data);
            });
          };


    //sortowanie po remisie rosnąco
    const sortByDraw = () => {

     axios.get("http://localhost:3000/stats/sortStatsByDraw").then((resp) => {
              const { data } = resp;
              setStatsList(data);
            });
          };


    //sortowanie po remisie malejąco
    const sortByDrawDesc = () => {

     axios.get("http://localhost:3000/stats/sortStatsByDrawDesc").then((resp) => {
              const { data } = resp;
              setStatsList(data);
            });
          };


    //sortowanie po przegranych rosnąco
    const sortByLosers = () => {

     axios.get("http://localhost:3000/stats/sortStatsByLosers").then((resp) => {
              const { data } = resp;
              setStatsList(data);
            });
          };


    //sortowanie po przegranych malejąco
    const sortByLosersDesc = () => {

     axios.get("http://localhost:3000/stats/sortStatsByLosersDesc").then((resp) => {
              const { data } = resp;
              setStatsList(data);
            });
          };


      //Pokaż wszystkie
      const filterByAll = () => {

     axios.get("http://localhost:3000/stats/filterStatsByAll").then((resp) => {
              const { data } = resp;
              setStatsList(data);
              setCurrentPage(1);
            });
          };


      //Pokaż top 10 najepszych graczy
       const filterByTop10 = () => {

     axios.get("http://localhost:3000/stats/filterStatsByTop10").then((resp) => {
              const { data } = resp;
              setStatsList(data);
              setCurrentPage(1);
            });
          };


      //pokaż top 20 najlepszych 
      const filterByTop20 = () => {

     axios.get("http://localhost:3000/stats/filterStatsByTop20").then((resp) => {
              const { data } = resp;
              setStatsList(data);
              setCurrentPage(1);
            });
          };


      //pokaż top30 najlepszych
      const filterByTop30 = () => {

     axios.get("http://localhost:3000/stats/filterStatsByTop30").then((resp) => {
              const { data } = resp;
              setStatsList(data);
              setCurrentPage(1);
            });
          };


      //pokaż top 50 najlepszych
      const filterByTop50 = () => {

     axios.get("http://localhost:3000/stats/filterStatsByTop50").then((resp) => {
              const { data } = resp;
              setStatsList(data);
              setCurrentPage(1);
            });
          };


  return (
    <div className="App">
      <h1>Statystyki</h1>
      {/* przyciski filtrowania */}
      <div class="filter">
        <a class="buttonfilter" onClick={filterByAll} >Pokaż wszystkie</a>
        <a class="buttonfilter"  onClick={filterByTop10} >Top 10</a>
        <a class="buttonfilter"  onClick={filterByTop20} >Top 20</a>
        <a class="buttonfilter"  onClick={filterByTop30} >Top 30</a>
        <a class="buttonfilter"  onClick={filterByTop50} >Top 50</a>
      </div>
      


		  <table cellSpacing="0" cellPadding="0" border="0" style={{width: "100%"}}>
		    <thead>
		      <tr id="header">
		        <td width="40%" align="left">
            <div class ="inline">Gracz</div> <div class ="inline"><a onClick={sortByName} class="headerSortUp-by-name"></a><a onClick={sortByNameDesc} class="headerSortDown-by-name"></a></div>
		        </td>
		        <td width="30%" align="center">
              <div class="inline">Ranking</div><div class="inline"> <a onClick={sortByRank} class="headerSortUp-by-rank"></a><a onClick={sortByRankDesc} class="headerSortDown-by-rank"></a></div>
		        </td>
		        <td width="30%" align="center" id="header">
            <div class="inline-with-margin"> 
            <div class="wdl">
              W 
            </div>
              <a onClick={sortByWins} class="headerSortUp-by-WDL"></a>
              <a onClick={sortByWinsDesc} class="headerSortDown-by-WDL"></a>
            </div>
            <div class="inline-with-margin"> 
              <div class="wdl">
              /D 
              </div>
              <a onClick={sortByDraw} class="headerSortUp-by-WDL"></a>
              <a onClick={sortByDrawDesc} class="headerSortDown-by-WDL"></a>
            </div>
            <div class="inline-with-margin"> 
            <div class="wdl">
              /L 
            </div>
              <a onClick={sortByLosers} class="headerSortUp-by-WDL"></a>
              <a onClick={sortByLosersDesc} class="headerSortDown-by-WDL"></a>
            </div>
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