import Card from "./../card/Card.js";

export default class Board {
  deck = [];
  revealedCardStack;

  resultStacks = new Array(4);
  gameStacks = new Array(7);

  startDistribution;

  constructor() {
    const CARDS_IN_INITIAL_DECK = 52;

    for (let id = 0; id < CARDS_IN_INITIAL_DECK; ++id) {
      this.deck.push(new Card(id));
    }

    this.#fillGameStacks();
    this.startDistribution = {
      drawingCards: this.deck,
      gameStacks: this.gameStacks
    }
  }

  get finishState() {
    for (let stack of this.resultStacks) {
      if (stack.length !== Card.RANKS_IN_SUITE) {
        return false;
      }
    }

    return true;
  }

  // PRIVATE METHODS

  #peek(arr) {
    return arr.length > 0 ? this.arr[this.arr.length - 1] : null;
  }

  #takeRandomCardFromDeck() {
    const cardsInDeck = deck.length;
    const index = Math.round(Math.random() * cardsInDeck);

    return this.deck.splice(index, 1);
  }

  #fillGameStacks() {
    for (let i = 0; i < this.gameStacks.length; ++i) {
      for (let j = 0; j < i + 1; ++j) {
        const card = this.#takeRandomCardFromDeck();

        if (j < i) {
          card.toggleVisibility();
        }

        this.gameStacks[i].push(card);
      }
    }
  }

  #moveAllCardsFromRevealedToHidden() {
    while (this.revealedCardStack.length > 0) {
      const cardFromTopOfRevealed = this.revealedCardStack.pop();
      cardFromTopOfRevealed.toggleVisibility();

      this.deck.push(cardFromTopOfRevealed);
    }
  }

  // PUBLIC METHODS

  passCardToRevealedStack() {
    if(this.deck.length > 0){
      const cardFromTopOfDeck = this.deck.pop();
      cardFromTopOfDeck.toggleVisibility();

      this.revealedCardStack.push(cardFromTopOfDeck);
    }
    else{
      this.#moveAllCardsFromRevealedToHidden();
    }
  }

  moveFromRevealedToGameStack(stackNumber) {
    if(this.gameStacks[stackNumber].length === 0){
      const peekedCard = this.#peek(this.deck);

      if(peekedCard.rank === 'K'){
        const poppedCard = this.deck.pop();

        this.gameStacks[stackNumber].push(poppedCard);
      }
    }
    else{
      const cardFromRevealed = this.#peek(this.revealedCardStack);
      const cardToMatch = this.#peek(this.gameStacks[stackNumber]);

      if(cardFromRevealed.isDescensingAndOppositeTo(cardToMatch)){
        const poppedCardToMatch = this.gameStacks[stackNumber].pop();

        this.gameStacks[stackNumber].push(poppedCardToMatch);
      }
    }
  }

  moveBetweenGameStacks(sourceStackIndex, movingCardsAmount, targetStackIndex) {
    const sourceStackCopy = this.gameStacks[sourceStackIndex];
    
    if(sourceStackCopy.length < movingCardsAmount){
      return;
    }

    if(this.gameStacks[targetStackIndex].length === 0){
      const cardFromSourceStack = sourceStackCopy[sourceStackCopy.length - movingCardsAmount];

      if(cardFromSourceStack.rank === 'K'){
        let startingIndex = sourceStackCopy.length - movingCardsAmount - 1;
        let cardsToMove = this.gameStacks[sourceStackIndex].splice(startingIndex, movingCardsAmount);

        this.gameStacks[sourceStackIndex].push(...cardsToMove);
      }
    }
    else{
      let cardFromSourceStack = sourceStackCopy[sourceStackCopy.length - movingCardsAmount];
      let cardFromTargetStack = this.#peek(sourceStackCopy);

      if(cardFromSourceStack.isDescensingAndOppositeTo(cardFromTargetStack)){
        let startingIndex = sourceStackCopy.length - movingCardsAmount - 1;
        let cardsToMove = this.gameStacks[sourceStackIndex].splice(startingIndex, movingCardsAmount);

        this.gameStacks[sourceStackIndex].push(...cardsToMove);
      }
    }
  }
  
  moveFromRevealedToResultStack(targetStackIndex) {
    const cardFromRevealed = this.#peek(this.revealedCardStack);
    const cardFromResultStack = this.#peek(this.resultStacks[targetStackIndex]);

    if(cardFromRevealed.isAscendingCardInSuiteTo(cardFromResultStack)){
      const cardPoppedFromRevealed = this.revealedCardStack.pop();

      this.resultStacks[targetStackIndex].push(cardPoppedFromRevealed);
    }
  }
}
