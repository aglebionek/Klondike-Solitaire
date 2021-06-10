# Card

W tej sekcji jak nazwa wskazuje znajdziemy proces tworzenia głownego elementu rozgrywki czyli oczywiście karty. 

## Proces tworzenia

Stała określająca ilość kart w danym kolorze `static RANKS_IN_SUITE = 13;`.

Funkcja `rank()` nadaje rangowanie kart, w `switch (rankNumber)` proces jest przedstwaiony szczegółowo jakiemu id odpowaida poszczególna karta. 
```js
get rank() {
    const rankNumber = this.#id % Card.RANKS_IN_SUITE;
    let rankSymbol;

    switch (rankNumber) {
      case 0:
        rankSymbol = "A"; // Ace
        break;
      case 10:
        rankSymbol = "J"; // Jack
        break;
      case 11:
        rankSymbol = "Q"; // Queen
        break;
      case 12:
        rankSymbol = "K"; // King
        break;
      default:
        rankSymbol = (rankNumber + 1).toString();
    }

    return rankSymbol;
  }
```

Nieżej funkcja `suite()` nadaje odpowiednie frakcje.
  ```js
 get suite() {
    const suiteNumber = Math.floor(this.#id / Card.RANKS_IN_SUITE);
    const suites = ["diamonds", "hearts", "spades", "clubs"];

    return suites[suiteNumber];
  }
```
## Prywatne metody pomagające w układaniu
`isOppositeColorTo = (card)` usatala kolor kart , sprawdzając czy karta jest czarna, w przeciwnym wypadku oczyswiście jest czerwona.
```js
  #isOppositeColorTo = (card) => {
    const blackSuites = ["clubs", "spades"];

    const thisCardSuite = blackSuites.includes(this.suite) ? "black" : "red";
    const cardToCheckSuite = blackSuites.includes(card.suite) ? "black" : "red";

    return thisCardSuite === cardToCheckSuite;
  };
```
`#isSameSuiteTo = (card)` sprawdzenie spójności frakcji.
```js
  #isSameSuiteTo = (card) => {
    return this.suite === card.suite;
  };
```
## Publiczne metody

(Opis)

```js
isAscendingCardInSuiteTo = (card) => {
    return this.#isSameSuiteTo(card) && (this.#id === card.#id + 1);
  };

  isDescendingAndOppositeTo = (card) => {
    return this.#isOppositeColorTo(card) && card.isAscendingCardInSuiteTo(this);
  };

  toggleVisibility = () => {
    this.#isVisible = !this.#isVisible;
  }
```