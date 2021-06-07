## register.js

Odpowiada za rejestracje użytkownika.

Przy użyciu `useState()` pobierane są stałe potrzebne do rejestracji.

`isValid()` odpowiada za walidacje wpisywanych danych do rejestracji.

`isValid` zmienia się na false w przypadku gdy nie spełnione są późniejsze warunki związane z `emailRegex` czyli dokładnym regex'em maila, maksymalną długością `username`, minimalną i maksymalną długością `password`. Sprawdzane jest też czy `confirmPassword` jest takie samo jak `password`.

`handle submit` to przycisk wysyłający wypełniony formularz tylko jeśli `isValid()` zwróci true.

```js
agent
  .post("auth/register", {
    email: email,
    username: username,
    password: password,
  })
  .then((resp) => {
    if (resp.status === 200) {
      localStorage.setItem("isLogged", true);
      setLoggedIn(true);
    }
  });
```

formularz jest przesyłany, przekierowany do `"auth/register"`, a następnie następuje automatyczne zalogowanie.

W przypadku, gdy wprowadzony email istnieje, wyłapywany jest błąd:

```js
 .catch((err) => {
          const { data } = err.response;
          if (data) {
            data.email && setEmailError(data.email);
            data.server && setServerErr or(data.server);
          }
        }
```

`if (isLoggedIn) return <Redirect to="/"/>;` powoduje przeniesienie na stronę główną jeśli ktoś już jest zalogowany.

Przy edycji każdego z pól następuje wywołanie

```js
onChange={(e) => {
                  setProp(e.target.value);//Prop np. Email
}
```

które przeprowadza walidacje pola 'Prop'.

`Register.css` i `RegisterCyberpunk.css` to pliki `.css` odpowiadające za styl widoku rejestracji. Pierwszy z nich to normalny styl, drugi to styl 'Cyberpunk'.
