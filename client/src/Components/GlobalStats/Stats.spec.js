import React from "react";
import ReactDOM from 'react-dom';
import {act} from "react-dom/test-utils";
import Stats from "./Stats";
import axios from "axios";
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

// ta funckja będzie wykonywała się po ką=ażdym teście
afterEach(() => {
    // usuewam z dokumnetu kontener
    // a nastepnie zawartyość jego zmiennej
    // zabopeignie to problemów z
    // renderowaniem przy każdym teście
    document.body.removeChild(container);
    container = null;
});

// test sprawdza czy dane które przyszłby z API
// renderują się poprawnie
test('it renders data from API', async () => {
    // definuje że axios bedzie mockowany
    jest.mock("axios");
    // mowie co konkretnie bedzie mockowane
    axios.get = jest.fn();

    // definuje dane które przyszłyby z API
    // gdybyśmy robili realne zapytanie HTTP
    let mock = {
        ID: 1,
        Avatar: 'https://i.pinimg.com/736x/3b/37/cd/3b37cd80d4f092ed392b1453b64cf0d0.jpg',
        Nazwa: "Testowy Kot",
        Ranking: 1,
        Wygrane: 999,
        Remisy: 0,
        Przegrane: 0
    };

    // UWAGA:
    // komponent Stats wykorzystuje komponent Posts do renderowania wyników API
    // z komponentu Posts wiemy w jaki sposób powinny wygladac dane
    // tj. dlaczego obiekt mock ma akurat taką strukture a nie inną

    // mockuje metode get biblioteki axios jako konkretną implementacje
    // "ej stary, jesli ktoś berdzie probował uzyc Twojej funkcji get() to
    // zamiast wykonywac zapytanie zwroc mu te dane"
    await act(async () => {
        await axios.get.mockImplementationOnce(() => Promise.resolve({
            data: [mock]
        }));
        ReactDOM.render(<Stats effect={100}/>, container);
    });

    // skoro zmockowalismy dane to wiemy w jakej postaci przysły
    // powinnien byc jeden element z danymi ze zmiennej mock
    const listItem = container.querySelector('#stats-table tr:first-child');
    const statistic = listItem.querySelector('td:last-child');

    expect(listItem).not.toBeNull();
    expect(statistic.innerHTML).toBe(`${mock.Wygrane}/${mock.Remisy}/${mock.Przegrane}`);
});


// test sprawdza filtorowanie po top 10 działa
test('can filter by top 10', async () => {
    // definuje że axios bedzie mockowany
    jest.mock("axios");
    // mowie co konkretnie bedzie mockowane
    axios.get = jest.fn();

    // definuje dane które przyszłyby z API
    // gdybyśmy robili realne zapytanie HTTP
    let mock = [
        {
            ID: 1,
            Ranking: 4,
        },
        {
            ID: 2,
            Ranking: 55,
        },
        {
            ID: 3,
            Ranking: 1,
        }
    ];

    // UWAGA:
    // komponent Stats wykorzystaje komponent Posts do renderowania wyników API
    // z komponentu Posts wiemy w jaki sposób powinne wygladac dane

    // UWAGA:
    // Mozna ogarniczac klucze obiektów do tych które są wymagane przez komponent
    // oraz do testowania, np zeby sprawdzic czy filtrowanie dziala
    // potrzebujemy tylko klucze ID oraz Ranking

    // mockuje metode get biblioteki axios jako konkretną implementacje
    // "ej stary, jesli ktoś berdzie probował uzyc Twojej funkcji get() to
    // zamiast wykonywac zapytanie zwroc mu te dane"
    await act(async () => {
        await axios.get.mockImplementationOnce(() => Promise.resolve({
            data: mock
        }));
        ReactDOM.render(<Stats effect={100}/>, container);
    });

    // skoro zmockowalismy dane to wiemy w jakej postaci przysły
    // sprawdzamy poczatkowy stan, powinny byc wyrenderowane 3 elementy listy
    let list = container.querySelector('#stats-table');
    let listItems = list.querySelectorAll('tr');
    expect(list).not.toBeNull();
    expect(listItems.length).toBe(mock.length);

    // klikamy przycisk do filtracji po top 10
    fireEvent.click(container.querySelector('#filter-top-10'));

    list = container.querySelector('#stats-table');
    listItems = list.querySelectorAll('tr');
    // lista statysk powinna zawierac 2 elementy listy
    // poniewaz ranking tylko dwóch gracz jest mniejszy, rowny 10
    expect(list).not.toBeNull();
    expect(listItems.length).toBe(2);
});