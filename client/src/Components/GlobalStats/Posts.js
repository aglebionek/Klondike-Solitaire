import React from 'react';
import Spinner from "../Spinner/Spinner";
import ThemeSelector from '../ThemeSelector/ThemeSelector';

var _ = require('lodash')

const Posts = ({statsList, loading, userID}) => {
    if (loading) return (
        <Spinner></Spinner>
    )
    
    return <table width="100%" id={'stats-table'} cellSpacing="0" cellPadding="5">
        <tbody>
        {statsList.map(row => (
            <tr className={row.playerId === userID ? "loggedPlayer" : ""} key={row.playerId}>
                <td width="40%" align="left" className="posts__player">
                    <img src={'./images/' + row.icon + '.png'} width="50" height="50"/>
                    <p className="posts__name">{row.username}</p>
                </td>
                <td width="30%" align="center">{row.rank}</td>
                <td width="30%" align="center">{row.wins}/{row.draws}/{row.losses}</td>
            </tr>
        ))}
        </tbody>
    </table>;
};

export default ThemeSelector(Posts);