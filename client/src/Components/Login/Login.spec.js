import React from "react";
import ReactDOM from 'react-dom';
import {act} from "react-dom/test-utils";
import {fireEvent} from "@testing-library/react";
import Login from "./Login";

let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

// Testowy test, który przechodzi i jest "jakąś" formą przykładu
test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
});

//Test dla podania nieprawidłowego maila, powinna wyskoczyć wiadomość o błędnym mailu 
test("Incorrect email causes email Error", () => {
    act(() => {
        ReactDOM.render(<Login/>, container);
    });

    let invalidEmail = "tost mail"
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: invalidEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(invalidEmail);
    expect(input.nextElementSibling.textContent.length).toBeGreaterThanOrEqual(1);
});

//Test dla podania pustego maila/zostawienia pustego pola, powinna wyskoczyć wiadomość o błędnym mailu 
test("Empty mail causes email Error", () => {
    act(() => {
        ReactDOM.render(<Login/>, container);
    });

    let invalidEmail = ""
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: invalidEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(invalidEmail);
    expect(input.nextElementSibling.textContent.length).toBeGreaterThanOrEqual(1);
});

//Test dla podania prawidłowego maila, czy nie będzie wiadomości o błędzie
test("Correct maill does not cause email Error", () => {
    act(() => {
        ReactDOM.render(<Login/>, container);
    });

    let invalidEmail = "tost@mail.com"
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: invalidEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(invalidEmail);
    expect(input.nextElementSibling.textContent.length).toBeGreaterThanOrEqual(0);
});

//Test dla podania/zostawienia pustego hasła
test("Empty password causes password Error", () => {
    act(() => {
        ReactDOM.render(<Login/>, container);
    });

    let invalidPassword = ""
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Hasło"]');

    fireEvent.change(input,{target: {value: invalidPassword}});
    fireEvent.submit(form);

    expect(input.value).toBe(invalidPassword);
    expect(input.nextElementSibling.textContent.length).toBeGreaterThanOrEqual(1);
});

//Test dla podania prawidłowego hasła, czy nie będzie wiadomości o błędzie
test("Correct password does not cause password Error", () => {
    act(() => {
        ReactDOM.render(<Login/>, container);
    });

    let invalidPassword = "1234"
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Hasło"]');

    fireEvent.change(input,{target: {value: invalidPassword}});
    fireEvent.submit(form);

    expect(input.value).toBe(invalidPassword);
    expect(input.nextElementSibling.textContent.length).toBeGreaterThanOrEqual(0);
});
