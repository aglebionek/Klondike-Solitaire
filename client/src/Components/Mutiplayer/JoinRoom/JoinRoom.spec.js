import React from "react";
import ReactDOM from 'react-dom';
import {act} from "react-dom/test-utils";
import socket from './../socketConfig.js';
import JoinRoom from "./JoinRoom";
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

test('Export room on start', () => {
    // definuje że socket bedzie mockowany
    jest.mock('./../socketConfig.js');
    // mowie co konkretnie bedzie mockowane
    socket.emit = jest.fn();

    act(() => {
        ReactDOM.render(<BrowserRouter><JoinRoom/></BrowserRouter>, container);
    });

    expect(socket.emit).toHaveBeenCalledWith("export-room");
});

test('User can be kicked', () => {
    act(() => {
        ReactDOM.render(<BrowserRouter><JoinRoom/></BrowserRouter>, container);
    });

    // definuje że socket bedzie mockowany
    jest.mock('./../socketConfig.js');

    let lobbyModal = container.querySelector('.lobby__modal-container');
    expect(lobbyModal.classList.contains('active')).toBeFalsy();

    socket.emit('kicked');

    socket.on('kicked', () => {
        expect(lobbyModal.classList.contains('active')).toBeTruthy();
    });
});
