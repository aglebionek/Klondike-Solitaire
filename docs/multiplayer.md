## CreateRoom.js

Do tworzenia pokoju ustawione jest pobranie danych z bazy, a następnie `player = data.username`, nazwa jest ustawiana jako `username`.

```js
agent.get(`/account/${userId}`).then(({ data }) => {
  player = data.username;
});
```

Funkcja `CreateRoom()` tworzy nowy pokój.

`const initialRoomData` to bazowe dane, które ma pokój.

Aby zmienić ustawienia pokoju useState pobiera lokalne ustawienia pokoju i ustawia je w `roomData`.

```js
  const [roomData, updateRoomData] = useState(() => {
    const storageValue = localStorage.getItem('roomData');
```

`useEffect` używane jest do obslugiwania stanu, kontroluje jak zmieniają się wartości zmiennych.

Na koniec zwracane jest

```js
socket.on("start", () => {
  history.push("/game-view");
});
```

Gdy są spełnione warunki

```js
if (roomData.isCreated && !roomData.isBeingModified)
```

zwracany jest komponent utworzonego pokoju.

W lobby z `roomData` pobierane są dane np. `.name` lub `.minutes`.

W liście zwracani są gracze jako wartości `Object`.

```js
<button onClick={() => socket.emit("kick", { player })}>X</button>
```

Służy do wyrzucenia gracza.

Po naciśnięciu "Rozpocznij grę" uruchamia się funkcja `socket.emit('game-start', {room: roomData.name}`, która rozpoczyna grę w danym pokoju.

W przypadku nie spełnienia warunku

```js
if (roomData.isCreated && !roomData.isBeingModified)
```

zwracany jest komponent tworzenia pokoju w którym po stworzeniu pokoju powyższy warunek zostaje spełniony.

# JoinRoom.js

Odpowiada za komponent służący do dołączenia do pokoju

Mechanizm opiera się głównie na `socket`, który synchronizuje ze sobą wszystkie działania graczy.

# LobbyMultiplayer.js

Odpowiada za lobby multiplayer, posiada funkcje `joinRoom`, która pozwala dołączyć do pokoju.

`getRooms` to funkcja zwracająca obecnie dostępne pokoje.

`function LobbyMultiplayer()` zwraca komponent służący do poruszania się po pokojach, tworzeniu ich i dołączaniu.

# socketConfig.js

Pobiera socket na którym opiera się synchronizacja w trybie multiplayer.
