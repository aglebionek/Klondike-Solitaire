import React from 'react';

const Posts = ({statsList, loading}) => {
    if(loading) {
        return <h2>Loading...</h2>;
    }

    return <table width="100%">
        <tbody>
        {statsList.map(statsList => (
            <tr key={statsList.ID}>
                <td width="40%" align="left">{statsList.ID}. {statsList.Nazwa}</td>
                <td width="30%" align="center">{statsList.Ranking}</td>
                <td width="30%" align="center">{statsList.Wygrane}/{statsList.Remisy}/{statsList.Przegrane}</td>
            </tr>
        ))}
        </tbody>
    </table>;
};

export default Posts