# dbconfig.js

Plik odpowiadający za połączenie z bazą danych.

# SSL

Aby zachowana była poufność transmisji danych przesyłanych między aplikacją, a bazą danych dołączamy plik `BaltimoreCyberTrustRoot.crt.pem`, który odpowiada za szyfrowanie SSL.

```js
const file = fs.readFileSync(
  path.join(__dirname, "./BaltimoreCyberTrustRoot.crt.pem")
);
```

# Połączenie z serwerem

Oprócz podstawowych danych

- host
- user
- password
- database

Dołączony jest kod odpowiadający za SSL.

```js
ssl: {
    ca: file,
  },
```
