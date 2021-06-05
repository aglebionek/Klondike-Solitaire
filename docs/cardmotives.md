# Motywy kart

Funkcja `CardMotives` w `CardMotives.js` odpowiada za zwracanie komponentu motywu karty.

`props` to właściwości z których tworzona jest odpowiednia klasa karty. Wtedy można określić wartość, minisuit i mainsuit.

Zwracany jest `div` z ustalonymi danymi.

```js
<div className={"card " + props.card_classes}>
  <span className="card__value"></span>
  <span className="card__minisuit"></span>
  <span className="card__mainsuit"></span>
</div>
```

`card` div to cała karta

`card_value` span wyświetla wartości karty w narożnikach.

`card_minisuit` wyświetla kolor karty poniżej wartości.

`card_mainsuit` wyświetla duży kolor karty na środku.

Aby stworzyć kartę należy dodać kolor i wartość karty do napisu `card` w div. Na przykład aby stworzyć Króla Pik należy napisać:

```js
<div className="card vK spades">
```

`card` div bez dodatkowych klas pojawi się jako puste obramowanie.

Aby wyświetlić tył karty należy wpisać

```js
<div className="card back">
```

Dostępne kolory to: 'spades', 'hearts', 'diamonds', 'clubs'.

Dostępne wartości to: 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10', 'vJ', 'vQ', 'vK', 'vA'.

Aby zmienić motyw karty należy dopisać `cyberpunk` do `card` div.

```js
<div className="card vK spades cyberpunk">
```

Kolejność pisania klas nie powinna mieć większego znaczenia.
Aby zmienić rozmiar karty, należy zmienić `font-size` w klasie `.card`, w pliku `CardMotives.css`
