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

    expect(profileUserName.innerHTML).toBe(newUserName);
});
test('EMPTY new user name is NOT set after user name edition.', () => {
    act(() => {
        ReactDOM.render(<Account/>, container);
    });

    let profileUserName = container.querySelector('.profile-username');
    let editButton = container.querySelector('.edition-text');
    let editUserName = container.querySelector('.account_modal-nick-input');
    let okButton = container.querySelector('.modal-button-save');
    let newUserName = '';

    fireEvent.click(editButton);
    fireEvent.change(editUserName, {target: {value: newUserName}});
    fireEvent.click(okButton);

    expect(profileUserName.innerHTML).not.toBe(newUserName);
});

//Test sprawdzający walidację wprowadzenia starego hasła
test('Enter the CORRECT password to old password', () => {
    act(() => {
        ReactDOM.render(<Account/>, container);
    });

    let oldPassInput = container.querySelector('.account_modal-password-old-input');
    let correctOldPassword = "admin"

    fireEvent.change(oldPassInput, {target: {value: correctOldPassword}})

    //Czy na pewno nie pokazuje się span symbolizujący brak poprawności?
    expect(oldPassInput.nextElementSibling).toBeNull();
})
test('Enter the WRONG password to old password', () => {
    act(() => {
        ReactDOM.render(<Account/>, container);
    });

    let oldPassInput = container.querySelector('.account_modal-password-old-input');
    let correctOldPassword = "wrongPass"

    fireEvent.change(oldPassInput, {target: {value: correctOldPassword}})

    //Czy na pewno pokazuje się span symbolizujący brak poprawności?
    expect(oldPassInput.nextElementSibling).not.toBeNull();
})

//Test sprawdzający walidację wprowadzenia nowego hasła
test('Enter the CORRECT new password twice', () => {
    act(() => {
        ReactDOM.render(<Account/>, container);
    });

    let newPassInput = container.querySelector('.account_modal-password-input-new');
    let correctNewPassword = "admin123"

    let newPassInputRepeat = container.querySelector('.account_modal-password-input-new-repeat')
    let correctNewPasswordRepeat = correctNewPassword;

    fireEvent.change(newPassInput, {target: {value: correctNewPassword}})
    fireEvent.change(newPassInputRepeat, {target: {value: correctNewPasswordRepeat}})

    //Czy na pewno nie pokazuje się span symbolizujący brak poprawności?
    expect(newPassInputRepeat.nextElementSibling).toBeNull();
})
test('Enter the CORRECT new password and WRONG password as a repeated', () => {
    act(() => {
        ReactDOM.render(<Account/>, container);
    });

    let newPassInput = container.querySelector('.account_modal-password-input-new');
    let correctNewPassword = "admin123"

    let newPassInputRepeat = container.querySelector('.account_modal-password-input-new-repeat')
    let correctNewPasswordRepeat = "admin1233";

    fireEvent.change(newPassInput, {target: {value: correctNewPassword}})
    fireEvent.change(newPassInputRepeat, {target: {value: correctNewPasswordRepeat}})

    //Czy na pewno pokazuje się span symbolizujący brak poprawności?
    expect(newPassInputRepeat.nextElementSibling).not.toBeNull();
})
test('Enter the CORRECT new password and EMPTY password as a repeated', () => {
    act(() => {
        ReactDOM.render(<Account/>, container);
    });

    let newPassInput = container.querySelector('.account_modal-password-input-new');
    let correctNewPassword = "admin123"

    let newPassInputRepeat = container.querySelector('.account_modal-password-input-new-repeat')
    let correctNewPasswordRepeat = " ";

    fireEvent.change(newPassInput, {target: {value: correctNewPassword}})
    fireEvent.change(newPassInputRepeat, {target: {value: correctNewPasswordRepeat}})

    //Czy na pewno pokazuje się span symbolizujący brak poprawności?
    expect(newPassInputRepeat.nextElementSibling).not.toBeNull();
})
test('Enter the EMPTY new password and CORRECT password as a repeated', () => {
    act(() => {
        ReactDOM.render(<Account/>, container);
    });

    let newPassInput = container.querySelector('.account_modal-password-input-new');
    let correctNewPassword = " "

    let newPassInputRepeat = container.querySelector('.account_modal-password-input-new-repeat')
    let correctNewPasswordRepeat = "admin123";

    fireEvent.change(newPassInput, {target: {value: correctNewPassword}})
    fireEvent.change(newPassInputRepeat, {target: {value: correctNewPasswordRepeat}})

    //Czy na pewno pokazuje się span symbolizujący brak poprawności?
    expect(newPassInputRepeat.nextElementSibling).not.toBeNull();
})

//Test sprawdzający czy setNewData działa
test('New data is set when data is CORRECT', () => {
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

    let oldPassInput = container.querySelector('.account_modal-password-old-input');
    let correctOldPassword = "admin"

    fireEvent.change(oldPassInput, {target: {value: correctOldPassword}})

    let newPassInput = container.querySelector('.account_modal-password-input-new');
    let correctNewPassword = "admin123"

    let newPassInputRepeat = container.querySelector('.account_modal-password-input-new-repeat')
    let correctNewPasswordRepeat = "admin123";

    fireEvent.change(newPassInput, {target: {value: correctNewPassword}})
    fireEvent.change(newPassInputRepeat, {target: {value: correctNewPasswordRepeat}})
    fireEvent.click(okButton);

    //Czy zmieniła się nazwa?
    expect(profileUserName.innerHTML).toBe(newUserName);
    //Czy hasło zostało zmienione?
    fireEvent.change(oldPassInput, {target: {value: correctNewPassword}})
    expect(oldPassInput.nextElementSibling).toBeNull();
})
//  ATTENTION!!!
test('New data is NOT set when data is WRONG', () => {
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

    let oldPassInput = container.querySelector('.account_modal-password-old-input');
    let correctOldPassword = "admin"

    fireEvent.change(oldPassInput, {target: {value: correctOldPassword}})

    let newPassInput = container.querySelector('.account_modal-password-input-new');
    let correctNewPassword = "admin123"

    let newPassInputRepeat = container.querySelector('.account_modal-password-input-new-repeat')
    let wrongNewPasswordRepeat = "";

    fireEvent.change(newPassInput, {target: {value: correctNewPassword}})
    fireEvent.change(newPassInputRepeat, {target: {value: wrongNewPasswordRepeat}})
    fireEvent.click(okButton);

    fireEvent.click(editButton);
    //  Czy zmieniła się nazwa?
    //  Nazwa się zmieni, ponieważ nie potrzebuje walidacji hasła - możemy "od tak" zmienić nick
    expect(profileUserName.innerHTML).toBe(newUserName);
    //Czy hasło zostało zmienione?
    fireEvent.change(oldPassInput, {target: {value: correctNewPassword}})
    expect(oldPassInput.nextElementSibling).toBeNull();
})

//Test sprawdzający czy clearSettings działa
test('Settings are clear when click clearSettings button "Anuluj"', () => {
    act(() => {
        ReactDOM.render(<Account/>, container);
    });

    let profileUserName = container.querySelector('.profile-username');
    let editButton = container.querySelector('.edition-text');
    let editUserName = container.querySelector('.account_modal-nick-input');
    let clearButton = container.querySelector('.modal-button-cancel');
    let newUserName = "newUserName";

    fireEvent.click(editButton);
    fireEvent.change(editUserName, {target: {value: newUserName}});

    let oldPassInput = container.querySelector('.account_modal-password-old-input');
    let correctOldPassword = "admin"

    fireEvent.change(oldPassInput, {target: {value: correctOldPassword}})

    let newPassInput = container.querySelector('.account_modal-password-input-new');
    let correctNewPassword = "admin123"

    let newPassInputRepeat = container.querySelector('.account_modal-password-input-new-repeat')
    let corrNewPasswordRepeat = "admin123";

    fireEvent.change(newPassInput, {target: {value: correctNewPassword}})
    fireEvent.change(newPassInputRepeat, {target: {value: corrNewPasswordRepeat}})
    fireEvent.click(clearButton);

    expect(profileUserName).not.toBe(newUserName);
    expect(editUserName).toBeEmpty();
    expect(oldPassInput).toBeEmpty();
    expect(newPassInput).toBeEmpty();
    expect(newPassInputRepeat).toBeEmpty();
})

//Test sprawdzający czy wybieranie avatara się zapętla w prawo
test('After the last avatar, the first one appears.', () => {
    act(() => {
        ReactDOM.render(<Account/>, container);
    });

    let nextAvatarButton = container.querySelector('.modal-right-arrow');
    let avatar = container.querySelector('.modal-avatar-image');

    //z avatar1 na avatar2
    fireEvent.click(nextAvatarButton);
    //z avatar2 na avatar3
    fireEvent.click(nextAvatarButton);
    //z avatar3 na avatar4
    fireEvent.click(nextAvatarButton);
    //z avatar4 na avatar5
    fireEvent.click(nextAvatarButton);
    //z avatar5 na avatar6
    fireEvent.click(nextAvatarButton);
    //z avatar6 na avatar1
    fireEvent.click(nextAvatarButton);

    expect(avatar.src).toBe('http://localhost/images/avatar1.png')
})

//Test sprawdzający czy wybieranie avatara zapętla się w lewo
test('Before the first avatar, the last one appears.', () => {
    act(() => {
        ReactDOM.render(<Account/>, container);
    });

    let previousAvatarButton = container.querySelector('.modal-left-arrow');
    let avatar = container.querySelector('.modal-avatar-image');

    //z avatar1 na avatar6
    fireEvent.click(previousAvatarButton);

    expect(avatar.src).toBe('http://localhost/images/avatar6.png')
})

