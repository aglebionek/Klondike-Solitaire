import React from "react";
import ReactDOM from 'react-dom';
import {act} from "react-dom/test-utils";
import {fireEvent} from "@testing-library/react";
import Account from "./Account";

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

// Test sprawdzający działanie edycji nazwy użytkownika
test('New user name is set after user name edition.', () => {
    act(() => {
        ReactDOM.render(<Account/>, container);
    });

    let profileUserName = container.querySelector('.profile-username');
    let editButton = container.querySelector('.edition-text');
    let editUserName = container.querySelector('.account_modal-nick-input');
    let okButton = container.querySelector('.modal-button-save');
    let newUserName = "newUserName";

    fireEvent.click(editButton);
    fireEvent.change(editUserName, {target: {value: newUserName}});
    fireEvent.click(okButton);

    expect(profileUserName.value).toBe(newUserName);
});