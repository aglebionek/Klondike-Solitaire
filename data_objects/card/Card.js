export default class Card {
  #id;
  #isVisible;
  #beenMoved;
  static RANKS_IN_SUITE = 13;

  constructor(id) {
    if (id < 0 || id > 51) {
      throw new Error("Card ID out of range [0; 51]");
    }

    this.#id = id;
    this.#isVisible = true;
    this.#beenMoved = false;
  }

  // GETTERS

  get rank() {
    const rankNumber = this.#id % RANKS_IN_SUITE;
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

  get suite() {
    const suiteNumber = Math.floor(this.#id / RANKS_IN_SUITE);
    const suites = ["diamonds", "hearts", "spades", "clubs"];

    return suites[suiteNumber];
  }

  get objectForm() {
    return {
      rank: this.rank,
      suite: this.suite,
    };
  }

  get cardCode() {
    /*
      Cards may be coded in moves list like that: <suite-letter><rank-symbol>
      E.g. C2, D6, HQ, S3
    */

    return (this.suite.charAt(0) + this.rank.charAt(0)).toUpperCase();
  }

  get move() {
    return this.#beenMoved;
  }

  // PRIVATE METHODS

  #isOppositeColorTo = (card) => {
    const blackSuites = ["clubs", "spades"];

    const thisCardSuite = blackSuites.includes(this.suite) ? "black" : "red";
    const cardToCheckSuite = blackSuites.includes(card.suite) ? "black" : "red";

    return thisCardSuite === cardToCheckSuite;
  };

  #isSameSuiteTo = (card) => {
    return this.suite === card.suite;
  };

  // PUBLIC METHODS

  isAscendingCardInSuiteTo = (card) => {
    return this.#isSameSuiteTo(card) && this.rank === card.rank + 1;
  };

  isDescendingAndOppositeTo = (card) => {
    return this.#isOppositeColorTo(card) && card.isAscendingCardInSuiteTo(this);
  };

  toggleVisiblity() {
    this.#isVisible = !this.#isVisible;
  }

  hasBeenMoved() {
    this.#beenMoved = true;
  }
}
