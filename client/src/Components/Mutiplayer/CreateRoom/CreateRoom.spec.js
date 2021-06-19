import React from "react";
import ReactDOM from 'react-dom';
import {act} from "react-dom/test-utils";
import socket from './../socketConfig.js';
import CreateRoom from "./CreateRoom";
import {BrowserRouter} from 'react-router-dom';
import {fireEvent} from "@testing-library/react";

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

test('Update users data with new data', () => {
    act(() => {
        ReactDOM.render(<BrowserRouter><CreateRoom/></BrowserRouter>, container);
    });

    // definuje że socket bedzie mockowany
    jest.mock('./../socketConfig.js');

    // Tworzę pokój
    const initialRoom = {room: 3, users: 2};

    socket.emit('pass-room', initialRoom);
    socket.on('pass-room', ({room, users}) => {
        expect(users).toBe(initialRoom.users);
    });

    const updateRoomData = {room: 3, users: 6};

    socket.emit('pass-room', updateRoomData);
    socket.on('pass-room', ({room, users}) => {
        expect(users).toBe(6);
    });
});

test('Compatibility of the number of generated players', () => {
    act(() => {
        ReactDOM.render(<BrowserRouter><CreateRoom/></BrowserRouter>, container);
    });

    // definuje że socket bedzie mockowany
    jest.mock('./../socketConfig.js');

    // Tworzę pokój
    const initialRoom = {room: 1, users: 5};

    let playerRows = container.querySelectorAll('.player-row');

    socket.emit('pass-room', initialRoom);
    socket.on('pass-users', () => {

        //  Sprawdza czy wyrenderowała się piątka graczy
        expect(playerRows.length).toBe(5);

    });

    
});

test('check User Name', () => {
    act(() => {
        ReactDOM.render(<BrowserRouter><CreateRoom/></BrowserRouter>, container);
    });

    // definuje że socket bedzie mockowany
    jest.mock('./../socketConfig.js');

    // Tworzę pokój
    const initialRoom = {room: 1, users: 5};

    let playerRows = container.querySelectorAll('.player-row');

    socket.emit('pass-room', initialRoom);
    socket.on('pass-users', () => {

        expect(playerRows[0].querySelector("#PUsername").innerHTML).toBe('');

    });

    
});

test('Checks if room rename is working', () => {
    act(() => {
        ReactDOM.render(<BrowserRouter><CreateRoom/></BrowserRouter>, container);
    });

    let NameRoom = "NameRoom1"
    let input = container.querySelector('input[name="room-name"]');

    fireEvent.change(input,{target: {value: NameRoom}});

    expect(input.value).toBe(NameRoom);

    let form = container.querySelector('form');
    fireEvent.submit(form);

    let Name = container.querySelector('#Name');
    expect(Name.innerHTML).toBe("NameRoom1");


});

test('Checks if game time shifting is working', () => {
    act(() => {
        ReactDOM.render(<BrowserRouter><CreateRoom/></BrowserRouter>, container);
    });

    let GameTime = "15";
    let select = container.querySelector('select[name="game-time"]');

    fireEvent.change(select,{target: {value: GameTime}});
    expect(select.value).toBe(GameTime);

    let form = container.querySelector('form');
    fireEvent.submit(form);

    let Minutes = container.querySelector('#Minutes');
    expect(Minutes.innerHTML).toBe("15");
});

test('Checks if room creation is working', () => {
    act(() => {
        ReactDOM.render(<BrowserRouter><CreateRoom/></BrowserRouter>, container);
    });

    let NameRoom = "Pokoiczek1"
    let input = container.querySelector('input[name="room-name"]');

    fireEvent.change(input,{target: {value: NameRoom}});

    expect(input.value).toBe(NameRoom);


    let GameTime = "5";
    let select = container.querySelector('select[name="game-time"]');

    fireEvent.change(select,{target: {value: GameTime}});
    expect(select.value).toBe(GameTime);

    let StanowoPokoju = container.querySelector('h1[class="lobby__headline"]')
    expect(StanowoPokoju.innerHTML).toBe("Tworzenie pokoju");

    let form = container.querySelector('form');
    fireEvent.submit(form);

    let StanowoPokoju2 = container.querySelector('h1[class="lobby__headline"]')
    expect(StanowoPokoju2.innerHTML).toBe("Pokój utworzony");

});

test('Checks if changes have been saved after creating a room', () => {
    act(() => {
        ReactDOM.render(<BrowserRouter><CreateRoom/></BrowserRouter>, container);
    });

    let NameRoom = "NameRoom1"
    let input = container.querySelector('input[name="room-name"]');

    fireEvent.change(input,{target: {value: NameRoom}});

    expect(input.value).toBe(NameRoom);


    let GameTime = "5";
    let select = container.querySelector('select[name="game-time"]');

    fireEvent.change(select,{target: {value: GameTime}});
    expect(select.value).toBe(GameTime);

    let StanowoPokoju = container.querySelector('h1[class="lobby__headline"]')
    expect(StanowoPokoju.innerHTML).toBe("Tworzenie pokoju");

    let form = container.querySelector('form');
    fireEvent.submit(form);

    let StanowoPokoju2 = container.querySelector('h1[class="lobby__headline"]')
    expect(StanowoPokoju2.innerHTML).toBe("Pokój utworzony");

    let Name = container.querySelector('#Name')
    expect(Name.innerHTML).toBe("NameRoom1");

    let Minutes = container.querySelector('#Minutes')
    expect(Minutes.innerHTML).toBe("5");
});

test('Modification of the room', () => {
    act(() => {
        ReactDOM.render(<BrowserRouter><CreateRoom/></BrowserRouter>, container);
    });

    let StanowoPokoju = container.querySelector('h1[class="lobby__headline"]')
    expect(StanowoPokoju.innerHTML).toBe("Tworzenie pokoju");

    let form = container.querySelector('form');
    fireEvent.submit(form);
    
    let StanowoPokoju2 = container.querySelector('h1[class="lobby__headline"]')
    expect(StanowoPokoju2.innerHTML).toBe("Pokój utworzony");

    fireEvent.click(container.querySelector('#Modify'));

    expect(StanowoPokoju.innerHTML).toBe("Tworzenie pokoju");

});