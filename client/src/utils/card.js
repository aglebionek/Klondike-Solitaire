export const processRank = function (rank) {
  if (rank === "K" || rank === "Q" || rank === "J" || rank === "A") {
    switch (rank) {
      case "K":
        return 13;
      case "Q":
        return 12;
      case "J":
        return 11;
      case "A":
        return 1;
    }
  } else {
    return parseInt(rank);
  }
};

export const isDroppable = function (dropTarget, selectedCard) {
  if (dropTarget == null && selectedCard.rank === "K") return true;
  else if (dropTarget == null) return false;
  else if (
    processRank(dropTarget.rank) - processRank(selectedCard.rank) ===
    1
  ) {
    if (dropTarget.color !== selectedCard.color) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const isMovable = function (card, deck) {
  var movingCards = deck.slice(deck.indexOf(card));
  var ranks = movingCards.map((currCard) => processRank(currCard.rank));
  var colors = movingCards.map((currCard) => currCard.color);
  var currRank = processRank(card.rank);
  var currColor = card.color;
  for (var index = 1; index < ranks.length; index++) {
    if (currRank - ranks[index] !== 1) {
      return false;
    }
    if (currColor === colors[index]) {
      return false;
    }
    currColor = colors[index];
    currRank = ranks[index];
  }
  return true;
};

export const check4Stack = function (foundation, card) {
  if (foundation === null && card.rank === "A") {
    return true;
  } else if (foundation === null) return false;
  if (
    foundation.shape === card.shape &&
    processRank(card.rank) - processRank(foundation.rank) === 1
  ) {
    return true;
  } else {
    return false;
  }
};

const cards = [
  { rank: "2", color: "red", shape: "hearts" },
  { rank: "3", color: "red", shape: "hearts" },
  { rank: "4", color: "red", shape: "hearts" },
  { rank: "5", color: "red", shape: "hearts" },
  { rank: "6", color: "red", shape: "hearts" },
  { rank: "7", color: "red", shape: "hearts" },
  { rank: "8", color: "red", shape: "hearts" },
  { rank: "9", color: "red", shape: "hearts" },
  { rank: "10", color: "red", shape: "hearts" },
  { rank: "J", color: "red", shape: "hearts" },
  { rank: "Q", color: "red", shape: "hearts" },
  { rank: "K", color: "red", shape: "hearts" },
  { rank: "A", color: "red", shape: "hearts" },
  { rank: "2", color: "red", shape: "diamonds" },
  { rank: "3", color: "red", shape: "diamonds" },
  { rank: "4", color: "red", shape: "diamonds" },
  { rank: "5", color: "red", shape: "diamonds" },
  { rank: "6", color: "red", shape: "diamonds" },
  { rank: "7", color: "red", shape: "diamonds" },
  { rank: "8", color: "red", shape: "diamonds" },
  { rank: "9", color: "red", shape: "diamonds" },
  { rank: "10", color: "red", shape: "diamonds" },
  { rank: "J", color: "red", shape: "diamonds" },
  { rank: "Q", color: "red", shape: "diamonds" },
  { rank: "K", color: "red", shape: "diamonds" },
  { rank: "A", color: "red", shape: "diamonds" },
  { rank: "2", color: "black", shape: "spades" },
  { rank: "3", color: "black", shape: "spades" },
  { rank: "4", color: "black", shape: "spades" },
  { rank: "5", color: "black", shape: "spades" },
  { rank: "6", color: "black", shape: "spades" },
  { rank: "7", color: "black", shape: "spades" },
  { rank: "8", color: "black", shape: "spades" },
  { rank: "9", color: "black", shape: "spades" },
  { rank: "10", color: "black", shape: "spades" },
  { rank: "J", color: "black", shape: "spades" },
  { rank: "Q", color: "black", shape: "spades" },
  { rank: "K", color: "black", shape: "spades" },
  { rank: "A", color: "black", shape: "spades" },
  { rank: "2", color: "black", shape: "clubs" },
  { rank: "3", color: "black", shape: "clubs" },
  { rank: "4", color: "black", shape: "clubs" },
  { rank: "5", color: "black", shape: "clubs" },
  { rank: "6", color: "black", shape: "clubs" },
  { rank: "7", color: "black", shape: "clubs" },
  { rank: "8", color: "black", shape: "clubs" },
  { rank: "9", color: "black", shape: "clubs" },
  { rank: "10", color: "black", shape: "clubs" },
  { rank: "J", color: "black", shape: "clubs" },
  { rank: "Q", color: "black", shape: "clubs" },
  { rank: "K", color: "black", shape: "clubs" },
  { rank: "A", color: "black", shape: "clubs" },
];

export const shuffleCards = () => {
  const deck = cards.slice();
  const startColumn1 = [];
  const mainColumn1 = [];
  const mainColumn2 = [];
  const mainColumn3 = [];
  const mainColumn4 = [];
  const mainColumn5 = [];
  const mainColumn6 = [];
  const mainColumn7 = [];

  const mainColumns = {
    mainColumn1: mainColumn1,
    mainColumn2: mainColumn2,
    mainColumn3: mainColumn3,
    mainColumn4: mainColumn4,
    mainColumn5: mainColumn5,
    mainColumn6: mainColumn6,
    mainColumn7: mainColumn7,
  };

  for (let i = 0; i < 24; i++) {
    const random = Math.floor(Math.random() * deck.length);
    const card = deck[random];
    card.isVisible = false;
    startColumn1.push(deck[random]);
    deck.splice(random, 1);
  }

  Object.entries(mainColumns).map(([key, item], index) => {
    for (let j = 0; j < index + 1; j++) {
      const random = Math.floor(Math.random() * deck.length);
      const card = deck[random];
      if (j === index) {
        card.isVisible = true;
      } else card.isVisible = false;
      item.push(card);
      deck.splice(random, 1);
    }
  });

  return { startColumn1, ...mainColumns };
};

export const numMoves = function (
  columnList,
  foundationList,
  revealedCardStack
) {
  var nummov = 0;
  let i = 0;
  let j = 0;
  for (const column of columnList) {
    if (column.length !== 0) {
      for (const revealedCard of revealedCardStack) {
        if (isDroppable(column[column.length - 1], revealedCard)) {
          nummov += 1;
        }
      }
    }
    for (const column1 of columnList) {
      if (column.length !== 0 && column1.length !== 0) {
        if (i !== j) {
          for (const card of column1) {
            if (
              card.isVisible &&
              isDroppable(column[column.length - 1], card)
            ) {
              nummov += 1;
            }
          }
        }
      }
      j += 1;
    }
    j = 0;
    i += 1;
  }
  for (const column of columnList) {
    for (const foundation of foundationList) {
      if (column.length !== 0) {
        let fun = foundation[foundation.length - 1] || null;
        if (check4Stack(fun, column[column.length - 1])) {
          nummov += 1;
        }
      }
    }
  }

  for (const foundation of foundationList) {
    for (const revealedCard of revealedCardStack) {
      let fun = foundation[foundation.length - 1] || null;
      if (check4Stack(fun, revealedCard)) {
        nummov += 1;
      }
    }
  }
  return nummov;
};
