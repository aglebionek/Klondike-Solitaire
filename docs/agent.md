# agent.js

Służy do ustawienia adresu URL na lokalny lub na adres URL produkcyjny na podstawie zmiennej środowiskowej.

```js
if(process.env.NODE_ENV === "development")
```

Jeśli warunek jest spełniony zmienna `serverUrl="http://localhost:3001/"`.
W przeciwnym przypadku zmienna przyjmie adres URL produkcyjny `serverUrl ="https://pasjansklondike.herokuapp.com/"`.

Ustawiany jest domyślny adres dla axios
`axios.defaults.baseURL = serverUrl;`

Oraz przekazywane ciasteczek i headers
`axios.defaults.withCredentials = true;`
