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
  if (processRank(dropTarget.rank) - processRank(selectedCard.rank) === 1) {
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
  if (foundation === "" && card.rank === "A") {
    return true;
  }
  if (
    foundation.suit === card.suit &&
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
  const test = [];
  Object.entries(mainColumns).map(([key, item], index) => {
    for (let i = 0; i < item.length; i++) {
      for (let j = 0; j < test.length; j++) {
        if (test[j] == item[i]) {
          console.log("ten sam");
          return console.log("ten sam itemek");
        }
      }
      test.push(item[i]);
    }
  });

  for (let i = 0; i < startColumn1.length; i++) {
    for (let j = 0; j < test.length; j++) {
      if (test[j] == startColumn1[i]) {
        console.log("ten sam");
        return console.log("ten sam itemek");
      }
    }
    console.log("push");
    test.push(startColumn1[i]);
  }
  const aa = test.sort(compare);
  console.log(aa);

  function compare(a, b) {
    if (a.rank < b.rank) {
      return -1;
    }
    if (a.rank > b.rank) {
      return 1;
    }
    return 0;
  }

  return { startColumn1, ...mainColumns };
};

export const numMoves = function (
  columnList,
  foundationList,
  revealedCardStack
) {
  console.log(columnList);
  console.log(foundationList);
  console.log(revealedCardStack);
  var nummov = 0;
  for (const column of columnList) {
    const revealedCard = revealedCardStack.pop();
    if (isDroppable(revealedCard, column[0])) {
      nummov += 1;
      revealedCardStack.push(revealedCard);
    } else {
      revealedCardStack.push(revealedCard);
    }
    for (const column1 of columnList) {
      if (isDroppable(column[0], column1[0])) {
        nummov += 1;
      }
    }
  }
  for (const column of columnList) {
    for (const foundation of foundationList) {
      const revealedCard = revealedCardStack.pop();
      if (check4Stack(foundation, revealedCard)) {
        nummov += 1;
        revealedCardStack.push(revealedCard);
      } else {
        revealedCardStack.push(revealedCard);
      }
      if (check4Stack(foundation, column[0])) {
        nummov += 1;
      }
    }
  }
  return nummov;
};
