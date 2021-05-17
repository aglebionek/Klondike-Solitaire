import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import "./Stats.css";
import axios from 'axios';
import _ from 'lodash';


function GlobalStats() {
    const [statsList, setStatsList] = useState([]);
    const [allStatsList, setAllStatsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);

    const userID = 5;

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setPageMaxNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

   
        useEffect(() => {
            setLoading(true);
            axios.get("http://localhost:3000/stats/getStats").then((resp) => {
              const { data } = resp;
              resp.className = "red"
              setStatsList(data);
              setAllStatsList(data);
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
    setStatsList(_.orderBy(statsList, 'Nazwa', 'asc'));
  };

  //sortowanie po nazwie malejąco
  const sortByNameDesc = () => {
    setStatsList(_.orderBy(statsList, 'Nazwa', 'desc'));
  };

  //sortowanie po rankingu rosnąco
  const sortByRank = () => {
    setStatsList(_.orderBy(statsList, 'Ranking', 'asc'));
  };


  //sortowanie po rankingu malejąco
  const sortByRankDesc = () => {
    setStatsList(_.orderBy(statsList, 'Ranking', 'desc'));
  };
    

  //sortowanie po wygranych rosnąco
  const sortByWins = () => {
    setStatsList(_.orderBy(statsList, 'Wygrane', 'asc'));
  };


  //sortowanie po wygranych malejąco
  const sortByWinsDesc = () => {
    setStatsList(_.orderBy(statsList, 'Wygrane', 'desc'));
  };


  //sortowanie po remisie rosnąco
  const sortByDraw = () => {
    setStatsList(_.orderBy(statsList, 'Remisy', 'asc'));
  };


  //sortowanie po remisie malejąco
  const sortByDrawDesc = () => {
    setStatsList(_.orderBy(statsList, 'Remisy', 'desc'));
  };


  //sortowanie po przegranych rosnąco
  const sortByLosers = () => {
    setStatsList(_.orderBy(statsList, 'Przegrane', 'asc'));
  };


  //sortowanie po przegranych malejąco
  const sortByLosersDesc = () => {
    setStatsList(_.orderBy(statsList, 'Przegrane', 'desc'));
  };


  //Pokaż wszystkie
  const filterByAll = () => {
    setCurrentPage(1);
    setStatsList(allStatsList);
  };


  //Pokaż top 10 najepszych graczy
  const filterByTop10 = () => {
    setCurrentPage(1);
    const filterList = _.filter(allStatsList, oneStat => {
      return oneStat.Ranking <= 10;
    })

    setStatsList(_.orderBy(filterList, 'Ranking', 'asc'));
  };
    
  //pokaż top 20 najlepszych 
  const filterByTop20 = () => {
    setCurrentPage(1);
    const filterList = _.filter(allStatsList, oneStat => {
      return oneStat.Ranking <= 20;
    })
    setStatsList(_.orderBy(filterList, 'Ranking', 'asc'));
  };


  //pokaż top30 najlepszych
  const filterByTop30 = () => {
    setCurrentPage(1);
    const filterList = _.filter(allStatsList, oneStat => {
      return oneStat.Ranking <= 30;
    })
    setStatsList(_.orderBy(filterList, 'Ranking', 'asc'));
  };


  //pokaż top 50 najlepszych
  const filterByTop50 = () => {
    setCurrentPage(1);
    const filterList = _.filter(allStatsList, oneStat => {
      return oneStat.Ranking <= 50;
    })
    setStatsList(_.orderBy(filterList, 'Ranking', 'asc'));
  };


  return (
    <div className="App">
      <a className="stats__back" href="./..">
         &#129044;
      </a>
      <h1>Statystyki</h1>
      {/* przyciski filtrowania */}
      <div className="filter">
        <a className="buttonfilter" onClick={filterByAll} >Pokaż wszystkie</a>
        <a className="buttonfilter"  onClick={filterByTop10} >Top 10</a>
        <a className="buttonfilter"  onClick={filterByTop20} >Top 20</a>
        <a className="buttonfilter"  onClick={filterByTop30} >Top 30</a>
        <a className="buttonfilter"  onClick={filterByTop50} >Top 50</a>
      </div>
      


		  <table cellSpacing="0" cellPadding="0" border="0" style={{width: "100%"}}>
		    <thead>
		      <tr id="header">
		        <td width="40%" align="left">
            <div className ="inline">
              Gracz
            </div> 
            <div className ="inline">
              <a onClick={sortByName} className="headerSortUp-by-name"></a>
              <a onClick={sortByNameDesc} className="headerSortDown-by-name"></a>
            </div>
		        </td>
		        <td width="30%" align="center">
              <div className="inline">
                Ranking
              </div>
              <div className="inline"> 
                <a onClick={sortByRank} className="headerSortUp-by-rank"></a>
                <a onClick={sortByRankDesc} className="headerSortDown-by-rank"></a>
              </div>
		        </td>
		        <td width="30%" align="center" id="header">
            <div className="inline-with-margin"> 
              <div className="wdl">
                W 
              </div>
              <a onClick={sortByWins} className="headerSortUp-by-WDL"></a>
              <a onClick={sortByWinsDesc} className="headerSortDown-by-WDL"></a>
            </div>
            <div className="inline-with-margin"> 
              <div className="wdl">
              /D 
              </div>
              <a onClick={sortByDraw} className="headerSortUp-by-WDL"></a>
              <a onClick={sortByDrawDesc} className="headerSortDown-by-WDL"></a>
            </div>
            <div className="inline-with-margin"> 
              <div className="wdl">
                /L 
              </div>
              <a onClick={sortByLosers} className="headerSortUp-by-WDL"></a>
              <a onClick={sortByLosersDesc} className="headerSortDown-by-WDL"></a>
            </div>
		        </td>
          </tr>
        </thead>
      </table>
      <Posts statsList={currentPosts} loading={loading} userID={userID}/>
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