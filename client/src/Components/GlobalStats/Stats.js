import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import "./StatsCyberpunk.css";
import _ from 'lodash';
import buttonMenuClick from '../../soundtrack/SoundDesign/menu_click.mp3';
import buttonHoverSound from '../../soundtrack/SoundDesign/menu_hover.mp3';
import agent from '../../agent/agent.js';

function GlobalStats({effect}) {
    const [statsList, setStatsList] = useState([]);
    const [allStatsList, setAllStatsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);

    const userID = 10;

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setPageMaxNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

   
        useEffect(() => {
            setLoading(true);
            agent.get("stats/getStats").then((resp) => {
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

  const buttonSound = () => {
    let beep = new Audio(buttonMenuClick);
    beep.volume=(effect/100);
    beep.play();   
}
const buttonHover = () => {
    let beep = new Audio(buttonHoverSound);
    beep.volume=(effect/100);
    beep.play();   
}


  return (
    <div className="App">
      <div className="stats__back-div">
        <a className="stats__back" href="./..">
          &#129044;
        </a>
      </div>
      {/* przyciski filtrowania */}
      <div className="filter">
        <a className="buttonfilter"  id={'filter-by-all'} onClick={filterByAll} onMouseDown={buttonSound} onMouseOver={buttonHover}>Pokaż wszystkie</a>
        <a className="buttonfilter"  id={'filter-top-10'} onClick={filterByTop10} onMouseDown={buttonSound} onMouseOver={buttonHover}>Top 10</a>
        <a className="buttonfilter"  id={'filter-top-20'} onClick={filterByTop20} onMouseDown={buttonSound} onMouseOver={buttonHover}>Top 20</a>
        <a className="buttonfilter"  id={'filter-top-30'} onClick={filterByTop30} onMouseDown={buttonSound} onMouseOver={buttonHover}>Top 30</a>
        <a className="buttonfilter"  id={'filter-top-50'} onClick={filterByTop50} onMouseDown={buttonSound} onMouseOver={buttonHover}>Top 50</a>
      </div>
      <div className="stats__title">Statystyki</div>
       
		  <table cellSpacing="0" cellPadding="0" border="0" style={{width: "100%"}}>
		    <thead>
          <div className="stats__header">
            <div className="stats__header-player">
              <div className="stats__header-name">Gracz</div>
              <div className="stats__header-arrows">
                <a onClick={sortByName} id={'sort-up-by-name'} className="stats__header-arrows-up" onMouseDown={buttonSound} onMouseOver={buttonHover}></a>
                <a onClick={sortByNameDesc} id={'sort-down-by-name'} className="stats__header-arrows-down" onMouseDown={buttonSound} onMouseOver={buttonHover}></a>
              </div>
            </div>
            <div className="stats__header-rank">
              <div className="stats__header-name">Ranking</div>
              <div className="stats__header-arrows">
                <a onClick={sortByRank} id={'sort-up-by-name'} className="stats__header-arrows-up" onMouseDown={buttonSound} onMouseOver={buttonHover}></a>
                <a onClick={sortByRankDesc} id={'sort-down-by-name'} className="stats__header-arrows-down" onMouseDown={buttonSound} onMouseOver={buttonHover}></a>
              </div>
            </div>
            <div className="stats__header-wdl">
              <div className="stats__header-name">W</div>
              <div className="stats__header-arrows">
                <a onClick={sortByWins} id={'sort-up-by-name'} className="stats__header-arrows-up" onMouseDown={buttonSound} onMouseOver={buttonHover}></a>
                <a onClick={sortByWinsDesc} id={'sort-down-by-name'} className="stats__header-arrows-down" onMouseDown={buttonSound} onMouseOver={buttonHover}></a>
              </div>
              <div className="stats__header-name">D</div>
              <div className="stats__header-arrows">
                <a onClick={sortByDraw} id={'sort-up-by-name'} className="stats__header-arrows-up" onMouseDown={buttonSound} onMouseOver={buttonHover}></a>
                <a onClick={sortByDrawDesc} id={'sort-down-by-name'} className="stats__header-arrows-down" onMouseDown={buttonSound} onMouseOver={buttonHover}></a>
              </div>
              <div className="stats__header-name">L</div>
              <div className="stats__header-arrows">
                <a onClick={sortByLosers} id={'sort-up-by-name'} className="stats__header-arrows-up" onMouseDown={buttonSound} onMouseOver={buttonHover}></a>
                <a onClick={sortByLosersDesc} id={'sort-down-by-name'} className="stats__header-arrows-down" onMouseDown={buttonSound} onMouseOver={buttonHover}></a>
              </div>
            </div>
          </div>
        </thead>
      </table>
      <Posts statsList={currentPosts} loading={loading} userID={userID}/>
      <ul className="pageNumbers">
        <li>
          <button 
			      id={'previous-page'}
            onClick={handlePrevBtn}
            disabled={currentPage === pages[0] ? true : false}
            onMouseDown={buttonSound}
            onMouseOver={buttonHover}
          >
            Poprzednia
          </button>
        </li>
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
        <li>
          <button 
			      id={'next-page'}
            onClick={handleNextBtn}
            disabled={currentPage === pages[pages.length-1] ? true : false}
            onMouseDown={buttonSound}
            onMouseOver={buttonHover}
          >
            Następna
          </button>
        </li>
      </ul>
    </div>
    
    );	
		
    
  
}

export default GlobalStats;