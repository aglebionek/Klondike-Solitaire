# MainMenu.js

Plik odpowiadający za zwrócenie komponentu `MainMenu`, czyli główne menu gry.

Z tego widoku możemy się zalogować/wylogować, wybrać grę jednoosobową lub wieloosobową oraz skorzystać z dropdown menu, który pozwala wybrać z menu dalszą nawigacje.

`history = useHistory();` zapewnia dostęp do instancji historii, której używa się do nawigacji.

`[isLogged, setLog] = useState(false);` korzystając z useState ustala wartość logowania.

`buttonSound` to stała odpowiadająca za dźwięk w momencie kliknięcia na przycisk.

`buttonHover` to stała odpowiadająca za dźwięk w momencie najechania na przycisk.

`handleLogButton` to komponent odpowiadający za zalogowanie się lub wylogowanie. Jeśli `islogged` jest true, po kliknięciu następuje wylogowanie.

```js
agent.post("auth/logout").then(() => {
  setLog(false);
  localStorage.setItem("isLogged", false);
});
```

w przypadku `isLogged = false` następuje przekierowanie do zalogowania:

```js
history.push("login");
```

# Dropdown.js

Odpowiada za zwrócenie komponentu `Dropdown` służącego do wyświetleniu listy służącej do poruszania się po aplikacji.

Po kliknięciu funkcja `history.push` przenosi do innego widoku.

```js
let dropdown__class = display ? "dropdown__button" : "dropdown__button-hidden";
```

Ustala klasę `dropdown__class` na podstawie wartości `display`.

Wartość ta z góry jest ustalona jako false, a po kliknięciu wywołuje się `setDisplay(!display)`, który zmienia wartość na przeciwną.
