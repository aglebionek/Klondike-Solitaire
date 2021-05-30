import React, {useState} from "react";
import { useHistory } from "react-router-dom";

function Dropdown(props) {
    const history = useHistory();

    const [display, setDisplay] = useState(false);

    let dropdown__class = display ? "dropdown__button" : "dropdown__button-hidden";

    return (
        <div className='top-bar__dropdown'>
            <div className="dropdown__content">
                <button className="dropdown__button-top" onClick={() => setDisplay(!display)}><i className="fa fa-bars"></i></button>
                <button className={dropdown__class} onMouseOver={buttonHover} onMouseDown={buttonSound} onClick={() => history.push('settings')}>USTAWIENIA</button>
                <button className={dropdown__class} onMouseOver={buttonHover} onMouseDown={buttonSound} onClick={() => history.push('global-stats')}>STATYSTYKI</button>
                <button className={dropdown__class} onMouseOver={buttonHover} onMouseDown={buttonSound} onClick={() => history.push('authors')}>AUTORZY</button>
                <button className={dropdown__class} onMouseOver={buttonHover} onMouseDown={buttonSound} onClick={() => history.push('app-info')}>O GRZE</button> 
                <button className={dropdown__class} onMouseOver={buttonHover} onMouseDown={buttonSound} onClick={() => history.push('account')}>KONTO</button> 
            </div>
        </div>
    );
    
}

export default Dropdown;
