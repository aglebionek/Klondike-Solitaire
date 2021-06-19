import React from 'react';
import Spinner from "../Spinner/Spinner";

var _ = require('lodash')

const Posts = ({statsList, loading, userID}) => {
    if (loading) return (
        <Spinner></Spinner>
    )
    var styles = require("./Posts.css");
    if (localStorage.getItem('isLogged')) {
        if(localStorage.getItem('motiveCss') === "cyberpunk") {
            styles = require("./PostsCyberpunk.css");
        }
    }
    return <table width="100%" id={'stats-table'} cellSpacing="0" cellPadding="5">
        <tbody>
        {statsList.map(statsList => (
            <tr className={statsList.ID === userID ? "loggedPlayer" : ""} key={statsList.ID}>
                <td width="40%" align="left" className="posts__player"><p className="posts__id">{statsList.ID}</p> <img src={statsList.Avatar} width="50" height="50"/> <p className="posts__name">{statsList.Nazwa}</p> </td>
                <td width="30%" align="center">{statsList.Ranking}</td>
                <td width="30%" align="center">{statsList.Wygrane}/{statsList.Remisy}/{statsList.Przegrane}</td>
            </tr>
        ))}
        </tbody>
    </table>;
};

export default Posts