import React from "react";
import ReactDOM from 'react-dom';
import {act} from "react-dom/test-utils";
import socket from './socketConfig';
import LobbyMultiplayer from "./LobbyMultiplayer";
import {BrowserRouter} from 'react-router-dom';

// tworzę zmienna na konterner
// wyrederowana treść komponentów bedzie znajdowana się tutaj
let container;

// ta funkcja bedzie wykonywałą się przed każdym testem
beforeEach(() => {
    // jako konterner ustanawiam element HTML div
    // następnie dodaje go body w dokumencie
    container = document.createElement("div");
    document.body.appendChild(container);
});

// ta funckja będzie wykonywała się po każdym teście
afterEach(() => {
    // usuwam z dokumentu kontener
    // a nastepnie zawartyość jego zmiennej
    // zabopeignie to problemów z
    // renderowaniem przy każdym teście
    document.body.removeChild(container);
    container = null;
});
// Od kierowniczki
test('Export room on start', () => {
    // definuje że socket bedzie mockowany
    jest.mock('./socketConfig');
    // mowie co konkretnie bedzie mockowane
    socket.emit = jest.fn();

    act(() => {
        ReactDOM.render(<BrowserRouter><LobbyMultiplayer/></BrowserRouter>, container);
    });

    expect(socket.emit).toHaveBeenCalledWith("export-users");
});
// Od kierowniczki
test('The number of rooms is consistent with the number of elements', () => {
    act(() => {
        ReactDOM.render(<BrowserRouter><LobbyMultiplayer/></BrowserRouter>, container);
    });

    // definuje że socket bedzie mockowany
    jest.mock('./socketConfig');

    // Z każdym nowym pokojem tworzony jest element z klasą row1
    // Więc zbieram wszystkie elementy o takich klasach
    let roomRows = container.querySelectorAll('.row1');

    // Tworzę tablicę użytkowników
    // Pierwszy (0) użytkownik ląduje do pokoju z numerem 2, tak jak Drugi (1)
    // a Trzeci (2) ląduję do pokoju nr 3
    const usersArray = [{room: 2}, {room: 2}, {room: 3}]

    socket.emit('pass-users', usersArray);

    socket.on('pass-users', () => {
        //  Czy wyrenderowały się 2 pokoje? (o numerze 2 i o numerze 3)
        expect(roomRows.length).toBe(2);

        //  Czy pierwszy ma numer 2?
        expect(roomRows[0].querySelector('.Name').innerHTML).toBe('2');
        //  Czy jest 2 użytkowników?
        expect(roomRows[0].querySelector('.Ppl1').innerHTML).toBe('2');

        expect(roomRows[1].querySelector('.Name').innerHTML).toBe('3');
        expect(roomRows[1].querySelector('.Name').innerHTML).toBe('1');
    });
});