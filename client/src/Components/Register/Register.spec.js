import React from "react";
import ReactDOM from 'react-dom';
import {act} from "react-dom/test-utils";
import {fireEvent} from "@testing-library/react";
import Register from "./Register";

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

//  Przykład walidacji email'a
//  ATTENTION: Nie wyświetla się komunikat emailError
//  Jak to sprawdzić?
//  w Register.js po {emailError} możemy wpisać np "funny mail" w sposób:
//  linia 94 w Register.js: {emailError} funny test
//  i wtedy test przechodzi :)
test("incorrect mail causes emailError", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let invalidEmail = "funny mail"
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: invalidEmail}});

    expect(input.value).toBe(invalidEmail);
    expect(input.nextElementSibling.textContent.length).toBeGreaterThanOrEqual(1);
});

test("correct mail causes no emailError", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let validEmail = "abc@abc.com"
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: validEmail}});

    expect(input.value).toBe(validEmail);
    expect(input.nextElementSibling.textContent.length).toBeLessThanOrEqual(0);
});

