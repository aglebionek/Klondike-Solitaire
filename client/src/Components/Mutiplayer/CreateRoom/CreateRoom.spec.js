import React from "react";
import ReactDOM from 'react-dom';
import {act} from "react-dom/test-utils";
import socket from './../socketConfig.js';
import CreateRoom from "./CreateRoom";
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

// ta funkcja będzie wykonywała się po każdym teście
afterEach(() => {
    // usuwam z dokumentu kontener
    // a nastepnie zawartość jego zmiennej
    // zabopiegnie to problemów z
    // renderowaniem przy każdym teście
    document.body.removeChild(container);
    container = null;
});
// Od kierowniczki
test('Export room on start', () => {
    // definuje że socket bedzie mockowany
    jest.mock('./../socketConfig.js');
    // mowie co konkretnie bedzie mockowane
    socket.emit = jest.fn();

    act(() => {
        ReactDOM.render(<BrowserRouter><CreateRoom/></BrowserRouter>, container);
    });

    expect(socket.emit).toHaveBeenCalledWith("export-room");
});
// Od kierowniczki
test('Update room data with new data', () => {
    act(() => {
        ReactDOM.render(<BrowserRouter><CreateRoom/></BrowserRouter>, container);
    });

    // definuje że socket bedzie mockowany
    jest.mock('./../socketConfig.js');

    // Tworzę pokój
    const initialRoom = {room: 4, users: 2};

    socket.emit('pass-room', initialRoom);
    socket.on('pass-room', ({room, users}) => {
        expect(room).toBe(initialRoom.room);
    });

    const updateRoomData = {room: 'funny', users: 2};

    socket.emit('pass-room', updateRoomData);
    socket.on('pass-room', ({room, users}) => {
        expect(room).toBe('funny');
    });
});
// Coś z localStorage
test('localstorage is even working?', () => {
    act(() => {
        ReactDOM.render(<BrowserRouter><CreateRoom/></BrowserRouter>, container);
    });

    // definuje że socket bedzie mockowany
    jest.mock('./../socketConfig.js');

    // Tworzę pokój
    const localRoomTest = {room: 4, users: 2};

    socket.emit('pass-room', localRoomTest);

    socket.on('pass-room', ({room, users}) => {
        expect(room).toBe(localRoomTest.room);
        expect(users).toBe(localRoomTest.users);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
});