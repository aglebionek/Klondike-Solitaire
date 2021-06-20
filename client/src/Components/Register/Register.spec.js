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

// Próba walidacji email'a w stylu @abc.com
test("Testing email walidation with email like '@abc.com'", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let invalidEmail = "@abc.com";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: invalidEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(invalidEmail);
    expect(input.nextElementSibling.textContent).not.toBe("");
});

// Próba walidacji email'a w stylu abc@.com
test("Testing email walidation with email like 'abc@.com'", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let invalidEmail = "abc@.com";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: invalidEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(invalidEmail);
    expect(input.nextElementSibling.textContent).not.toBe("");
});

// Próba walidacji email'a w stylu abc@abc.
test("Testing email walidation with email like 'abc@abc.'", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let invalidEmail = "abc@abc.";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: invalidEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(invalidEmail);
    expect(input.nextElementSibling.textContent).not.toBe("");
});

// Próba walidacji email'a w stylu 'abc.abc@abc.com'
test("Testing email walidation with email like 'abc.abc@abc.com'", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let validEmail = "abc.abc@abc.com";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: validEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(validEmail);
    expect(input.nextElementSibling.textContent).toBe("");
});


// Próba walidacji email'a w stylu abc@abc.abc.com
test("Testing email walidation with email like 'abc@abc.abc.com'", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let validEmail = "abc@abc.abc.com";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: validEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(validEmail);
    expect(input.nextElementSibling.textContent).toBe("");
});

// Próba walidacji email'a długiej nazwy maila 
test("Testing email walidation with long email adress name", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let validEmail = "abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc@abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc.abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: validEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(validEmail);
    expect(input.nextElementSibling.textContent).toBe("");
});

// Próba walidacji email'a o nazwie bardzo krótkiej
test("Testing email walidation with short email like adress name", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let validEmail = "a@a.pl";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: validEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(validEmail);
    expect(input.nextElementSibling.textContent).toBe("");
});

// Próba walidacji email'a z podwójną kropką 
test("Testing email walidation with double dot", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let validEmail = "a@a..pl";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: validEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(validEmail);
    expect(input.nextElementSibling.textContent).not.toBe("");
});

// Próba walidacji email'a z niedozwolonymi znakami ','
test("Testing email walidation with incorrect character: ','", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let validEmail = "a@a.pl,";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: validEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(validEmail);
    expect(input.nextElementSibling.textContent).not.toBe("");
});


// Próba walidacji email'a z niedozwolonymi znakami ' '
test("Testing email walidation with incorrect character: ' '", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let validEmail = "a @a.pl";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: validEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(validEmail);
    expect(input.nextElementSibling.textContent).not.toBe("");
});

// Próba walidacji email'a z liczbami
test("Testing email walidation with numbers", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let validEmail = "a123@a.pl";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: validEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(validEmail);
    expect(input.nextElementSibling.textContent).toBe("");
});

// Próba walidacji email'a z polskimi znakami
test("Testing email walidation with polish characters", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let validEmail = "aąćę@a.pl";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: validEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(validEmail);
    expect(input.nextElementSibling.textContent).not.toBe("");
});

// Próba walidacji email'a z dużymi lierami
test("Testing email walidation with capital letters", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let validEmail = "ABC@a.pl";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Email"]');

    fireEvent.change(input,{target: {value: validEmail}});
    fireEvent.submit(form);

    expect(input.value).toBe(validEmail);
    expect(input.nextElementSibling.textContent).not.toBe("");
});

// Testowanie wprowadzania pustej nazwy użytkownika
test("Testing empty user name input", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let username = "";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Nazwa użytkownika"]');

    fireEvent.change(input,{target: {value: username}});
    fireEvent.submit(form);

    expect(input.value).toBe(username);
    expect(input.nextElementSibling.textContent).not.toBe("");
});

// Testowanie wprowadzania normalnej nazwy użytkownika
test("Testing normal user name input", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let username = "Kuba";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Nazwa użytkownika"]');

    fireEvent.change(input,{target: {value: username}});
    fireEvent.submit(form);

    expect(input.value).toBe(username);
    expect(input.nextElementSibling.textContent).toBe("");
});

// Testowanie krótkiej nazwy użytkownika
test("Testing short user name input", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let username = "K";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Nazwa użytkownika"]');

    fireEvent.change(input,{target: {value: username}});
    fireEvent.submit(form);

    expect(input.value).toBe(username);
    expect(input.nextElementSibling.textContent).toBe("");
});

// Testowanie 20-znakowej nazwy użytkownika
test("Testing 20-letters user name input", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let username = "aaaaabbbbbcccccddddd";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Nazwa użytkownika"]');

    fireEvent.change(input,{target: {value: username}});
    fireEvent.submit(form);

    expect(input.value).toBe(username);
    expect(input.nextElementSibling.textContent).toBe("");
});

// Testowanie 21-znakowej nazwy użytkownika
test("Testing 21-letters user name input", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let username = "aaaaabbbbbcccccddddde";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Nazwa użytkownika"]');

    fireEvent.change(input,{target: {value: username}});
    fireEvent.submit(form);

    expect(input.value).toBe(username);
    expect(input.nextElementSibling.textContent).not.toBe("");
});

// Testowanie wprowadzania pustego hasła
test("Testing empty password input", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let password = "";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Hasło"]');

    fireEvent.change(input,{target: {value: password}});
    fireEvent.submit(form);

    expect(input.value).toBe(password);
    expect(input.nextElementSibling.textContent).not.toBe("");
});

// Testowanie wprowadzania normalnego hasła
test("Testing normal password input", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let password = "Haslo123";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Hasło"]');

    fireEvent.change(input,{target: {value: password}});
    fireEvent.submit(form);

    expect(input.value).toBe(password);
    expect(input.nextElementSibling.textContent).toBe("");
});

// Testowanie wprowadzania 5-literowego hasła
test("Testing 5-letters password input", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let password = "aaaaa";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Hasło"]');

    fireEvent.change(input,{target: {value: password}});
    fireEvent.submit(form);

    expect(input.value).toBe(password);
    expect(input.nextElementSibling.textContent).not.toBe("");
});

// Testowanie wprowadzania 6-literowego hasła
test("Testing 6-letters password input", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let password = "aaaaab";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Hasło"]');

    fireEvent.change(input,{target: {value: password}});
    fireEvent.submit(form);

    expect(input.value).toBe(password);
    expect(input.nextElementSibling.textContent).toBe("");
});

// Testowanie wprowadzania 15-literowego hasła
test("Testing 15-letters password input", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let password = "aaaaabbbbbccccc";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Hasło"]');

    fireEvent.change(input,{target: {value: password}});
    fireEvent.submit(form);

    expect(input.value).toBe(password);
    expect(input.nextElementSibling.textContent).toBe("");
});

// Testowanie wprowadzania 16-literowego hasła
test("Testing 16-letters password input", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let password = "aaaaabbbbbcccccd";
    let form = container.querySelector('form');
    let input = container.querySelector('input[placeholder="Hasło"]');

    fireEvent.change(input,{target: {value: password}});
    fireEvent.submit(form);

    expect(input.value).toBe(password);
    expect(input.nextElementSibling.textContent).not.toBe("");
});

// Testowanie sprawdzania czy powtórzone hasło jest takie same jak hasło
test("Checking if repeated password matches password", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let password = "aaaaabb";
    let repeated_password = "aaaaabb";
    let form = container.querySelector('form');
    let input_password= container.querySelector('input[placeholder="Hasło"]');
    let input_repeated = container.querySelector('input[placeholder="Powtórz hasło"]');

    fireEvent.change(input_password,{target: {value: password}});
    fireEvent.change(input_repeated,{target: {value: repeated_password}});
    fireEvent.submit(form);

    expect(input_password.value).toBe(password);
    expect(input_repeated.value).toBe(repeated_password);
    expect(input_repeated.nextElementSibling.textContent).toBe("");
});

// Testowanie sprawdzania czy powtórzone hasło jest różne od hasła
test("Checking if incorrect repeated password matches password", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let password = "aaaaabb";
    let repeated_password = "aaaaabbc";
    let form = container.querySelector('form');
    let input_password= container.querySelector('input[placeholder="Hasło"]');
    let input_repeated = container.querySelector('input[placeholder="Powtórz hasło"]');

    fireEvent.change(input_password,{target: {value: password}});
    fireEvent.change(input_repeated,{target: {value: repeated_password}});
    fireEvent.submit(form);

    expect(input_password.value).toBe(password);
    expect(input_repeated.value).toBe(repeated_password);
    expect(input_repeated.nextElementSibling.textContent).not.toBe("");
});

// Symulacja poprawnej rejestracji
test("Simulating correct registration", () => {
    act(() => {
        ReactDOM.render(<Register/>, container);
    });

    let email = "abc@abc.com";
    let nickname = "Kuba";
    let password = "aaaaabb";
    let repeated_password = "aaaaabb";
    let form = container.querySelector('form');
    let input_email= container.querySelector('input[placeholder="Email"]');
    let input_nickname= container.querySelector('input[placeholder="Nazwa użytkownika"]');
    let input_password= container.querySelector('input[placeholder="Hasło"]');
    let input_repeated = container.querySelector('input[placeholder="Powtórz hasło"]');

    fireEvent.change(input_email,{target: {value: email}});
    fireEvent.change(input_nickname,{target: {value: nickname}});
    fireEvent.change(input_password,{target: {value: password}});
    fireEvent.change(input_repeated,{target: {value: repeated_password}});
    fireEvent.submit(form);

    expect(input_email.value).toBe(email);
    expect(input_nickname.value).toBe(nickname);
    expect(input_password.value).toBe(password);
    expect(input_repeated.value).toBe(repeated_password);
    expect(input_email.nextElementSibling.textContent).toBe("");
    expect(input_nickname.nextElementSibling.textContent).toBe("");
    expect(input_password.nextElementSibling.textContent).toBe("");
    expect(input_repeated.nextElementSibling.textContent).toBe("");
});