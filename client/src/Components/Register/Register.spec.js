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

//  Przykład walidacji email'a 1
test("incorrect mail causes emailError", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let invalidEmail = "funny mail"
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: invalidEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(invalidEmail);
    expect(input.nextElementSibling.textContent.length).toBeGreaterThanOrEqual(1);
});

//  Przykład walidacji email'a 2
test("correct mail causes no emailError", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let validEmail = "abc@abc.com";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: validEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(validEmail);
    expect(input.nextElementSibling.textContent.length).toBeLessThanOrEqual(0);
});

