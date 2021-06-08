## CreateRoom.js

Do tworzenia pokoju ustawione jest pobranie danych z bazy, a następnie zmienna player otrzymuje wartość z bazy `player = data.username`.

```js
agent.get(`/account/${userId}`).then(({ data }) => {
  player = data.username;
});
```

Komponent `CreateRoom()` odpowiada za reprezentacje formularza tworzenia pokoju.

`initialRoomData` to bazowe dane, które ma pokój.

```js
{
    isCreated: Boolean,
    isBeingModified: Boolean,
    name: String,
    minutes: Number,
    players: Array
}
```

Aby zmienić ustawienia pokoju `useState()` pobiera lokalne ustawienia pokoju i ustawia je w `roomData`.

```js
const [roomData, updateRoomData] = useState(() => {
  const storageValue = localStorage.getItem("roomData");

  return storageValue !== null ? JSON.parse(storageValue) : initialRoomData;
});
```

Od rozpoczęcia działania komponentu są nasłuchiwane kolejne zdarzenia:

- `'start'` nasłuchuje czy rozpoczęto rozgrywke.
- `'pass-room'` pobiera z backendu informacje o pokoju.

Gdy są spełnione warunki

```js
if (roomData.isCreated && !roomData.isBeingModified)
```

zwracana jest sekcja utworzonego pokoju.

W liście zwracani są gracze jako wartości `Object`.

```js
<button onClick={() => socket.emit("kick", { player })}>X</button>
```

Służy do wyrzucenia gracza.

Po naciśnięciu "Rozpocznij grę", przesyłana do socketów jest informacja o `"game-start"`, czyli o rozpoczęciu gry.

```js
<button onClick={() => socket.emit("game-start", { room: roomData.name })}>
  Rozpocznij grę
</button>
```

W przypadku nie spełnienia warunku

```js
if (roomData.isCreated && !roomData.isBeingModified)
```

zwracany jest komponent tworzenia pokoju w którym po stworzeniu pokoju powyższy warunek zostaje spełniony.

# JoinRoom.js

Odpowiada za komponent służący do dołączenia do pokoju

Mechanizm opiera się głównie na `socket`, który synchronizuje ze sobą wszystkie działania graczy.

# LobbyMultiplayer.js

Odpowiada za lobby multiplayer, posiada funkcje `joinRoom()`, która pozwala dołączyć do pokoju.

`getRooms()` to funkcja zwracająca obecnie dostępne pokoje.

`LobbyMultiplayer()` jest komponentem służący do poruszania się po pokojach, tworzeniu ich i dołączaniu.

# socketConfig.js

Pobiera socket na którym opiera się synchronizacja w trybie multiplayer.
