import React from 'react';
import "./Posts.css";
import Spinner from "../Spinner/Spinner";

var _ = require('lodash')

const Posts = ({statsList, loading, userID}) => {
    if (loading) return (
        <Spinner></Spinner>
    );

    return <table width="100%">
        <tbody>
        {statsList.map(statsList => (
            <tr className={statsList.ID === userID ? "loggedPlayer" : ""} key={statsList.ID}>
                <td width="40%" align="left">{statsList.ID} <img src={statsList.Avatar} width="50" height="50"/> {statsList.Nazwa} </td>
                <td width="30%" align="center">{statsList.Ranking}</td>
                <td width="30%" align="center">{statsList.Wygrane}/{statsList.Remisy}/{statsList.Przegrane}</td>
            </tr>
        ))}
        </tbody>
    </table>;
};

export default Posts