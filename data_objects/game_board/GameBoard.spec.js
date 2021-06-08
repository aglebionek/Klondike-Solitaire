import Board from "./GameBoard";
import Card from "./../card/Card.js";

//  Ten test nie przechodzi, natomiast po npm test -- GameBoard wyraźnie widać
//  że błąd jest po stronie kodu.
test('state is not finish on start', () => {
    let board = new Board();
    expect(board.finishState).toBe(false);
});

//Sprawdzam czy plansza do gry zostanie utworzona - Kuba
test("Checking if board will be created", () => {
    let board = new Board();
    expect(board).toBeDefined();
});

//Sprawdzam istnienie tali kart do grania - Kuba
test("Checking if card deck exists", () => {
    let board = new Board();
    expect(board.deck).toBeDefined();
});

//Sprawdzam istnienie stosu kart do dobierania - Kuba
test("Checking if revealed card stack exists", () => {
    let board = new Board();
    expect(board.revealedCardStack).toBeDefined();
});

//Sprawdzam istnienie pól do odkładnia kart - Kuba
test("Checking if result stacks exists", () => {
    let board = new Board();
    expect(board.resultStacks).toBeDefined();
});

//Sprawdzam ilość pól do odkładnia kart - Kuba
test("Checking number of result stacks", () => {
    let board = new Board();
    expect(board.resultStacks.length).toEqual(4);
});

//Sprawdzam istnienie pól do gry - Kuba
test("Checking if game stacks exists", () => {
    let board = new Board();
    expect(board.gameStacks).toBeDefined();
});

//Sprawdzam ilość pól do gry - Kuba
test("Checking number of game stacks", () => {
    let board = new Board();
    expect(board.gameStacks.length).toEqual(7);
});

//Sprawdzam czy rozdanie kart zostało zainicjalizowane - Kuba
test("Checking if start distribution exists", () => {
    let board = new Board();
    expect(board.startDistribution).toBeDefined();
});

//Sprawdzam czy zostały przypisane kary do tali - Kuba
test("Chceking if the deck has been filled", () => {
    let board = new Board();
    board.deck.forEach(element => {
        expect(element).toBeDefined();
    });
});

//Spawdzam czy ilość kart w polu do gry numer 0 jest poprawna - Kuba
test("Checking if number of cards in game stack 0 is correct", () =>{
    let board = new Board();
    expect(board.gameStacks[0].length).toEqual(1)
});

//Spawdzam czy ilość kart w polu do gry numer 1 jest poprawna - Kuba
test("Checking if number of cards in game stack 1 is correct", () =>{
    let board = new Board();
    expect(board.gameStacks[1].length).toEqual(2)
});

//Spawdzam czy ilość kart w polu do gry numer 2 jest poprawna - Kuba
test("Checking if number of cards in game stack 2 is correct", () =>{
    let board = new Board();
    expect(board.gameStacks[2].length).toEqual(3)
});

//Spawdzam czy ilość kart w polu do gry numer 3 jest poprawna - Kuba
test("Checking if number of cards in game stack 3 is correct", () =>{
    let board = new Board();
    expect(board.gameStacks[3].length).toEqual(4)
});

//Spawdzam czy ilość kart w polu do gry numer 4 jest poprawna - Kuba
test("Checking if number of cards in game stack 4 is correct", () =>{
    let board = new Board();
    expect(board.gameStacks[4].length).toEqual(5)
});

//Spawdzam czy ilość kart w polu do gry numer 5 jest poprawna - Kuba
test("Checking if number of cards in game stack 5 is correct", () =>{
    let board = new Board();
    expect(board.gameStacks[5].length).toEqual(6)
});

//Spawdzam czy ilość kart w polu do gry numer 6 jest poprawna - Kuba
test("Checking if number of cards in game stack 6 is correct", () =>{
    let board = new Board();
    expect(board.gameStacks[6].length).toEqual(7)
});

//Sprawdzam czy pole do odkładnia kart 0 jest puste - Kuba
test("Checking if result stack 0 is empty", () => {
    let board = new Board();
    expect(board.resultStacks[0].length).toEqual(0);
});

//Sprawdzam czy pole do odkładnia kart 1 jest puste - Kuba
test("Checking if result stack 1 is empty", () => {
    let board = new Board();
    expect(board.resultStacks[1].length).toEqual(0);
});

//Sprawdzam czy pole do odkładnia kart 2 jest puste - Kuba
test("Checking if result stack 2 is empty", () => {
    let board = new Board();
    expect(board.resultStacks[2].length).toEqual(0);
});

//Sprawdzam czy pole do odkładnia kart 3 jest puste - Kuba
test("Checking if result stack 3 is empty", () => {
    let board = new Board();
    expect(board.resultStacks[3].length).toEqual(0);
});

//Sprawdzam czy ilość kart do dobrania jest poprawna - Kuba
test("Checking if number of cards to draw is correct", () => {
    let board = new Board();
    expect(board.deck.length).toEqual(24);
});

//Sprawdzam czy przekazywanie karty ze stosu kart do stosu kart do dobierania - Kuba
test("Checking if function to passing card to reveal stack passes the card", () => {
    let board = new Board();

    board.passCardToRevealedStack();
    expect(board.revealedCardStack.length).toEqual(1);
});

//Zapełnienie całego stosu kart do dobierania - Kuba
test("Making revealed stack full", () => {
    let board = new Board();

    let i = 0;
    while (i < 24){
        board.passCardToRevealedStack();
        i++;
    }
    expect(board.revealedCardStack.length).toEqual(24);
});

//Przekazanie jednej więcej karty, gdy stos do dobierania jest pełny - Kuba
test("Passing one more card when the revealed stack full", () => {
    let board = new Board();

    let i = 0;
    while (i < 25){
        board.passCardToRevealedStack();
        i++;
    }
    expect(board.revealedCardStack.length).toEqual(0);
});

//Sprawdzenie czy stos po resecie jest taki sam jak przedtem - Kuba
test("Checking if stack after reset is the same as before", () => {
    let board = new Board();

    let original_stack = board.deck;

    let i = 0;
    while (i < 25){
        board.passCardToRevealedStack();
        i++;
    }

    i = 0;
    while (i<24){
        expect(board.deck[i]).toBe(original_stack[i])
        i++;
    }
});

//Przeniesienie karty z jednego stosu do gry na drugi  - Kuba
test('Passing a card from one game stack to the other', () => {
    let board = new Board();

    board.gameStacks[0][0] = new Card(14); // Dwójka kier
    let card_from_gamestack0 = board.gameStacks[0][0];
    board.gameStacks[1][board.gameStacks[1].length - 1] = new Card(28); // trójka pik

    board.moveBetweenGameStacks(0, 1, 1);

    expect(board.gameStacks[0].length).toEqual(0);
    expect(board.gameStacks[0][0]).toBeUndefined();
    expect(board.gameStacks[1].length).toEqual(3);
    expect(board.gameStacks[1][board.gameStacks[1].length - 1]).toBe(card_from_gamestack0);
});

//Przeniesienie Króla ze stosu kart do dobierania na puste pole do gry - Kuba
test('Passing a King card from reveal deck to an empty game stack', () => {
    let board = new Board();

    board.gameStacks[0] = []; //pusty stos
    board.revealedCardStack = [ new Card(12) ]; //Król karo
    
    board.moveFromRevealedToGameStack(0);
    let gamestack0_length = board.gameStacks[0].length;

    expect(gamestack0_length).toEqual(1);
    expect(board.gameStacks[0][0].rank).toBe('K');
    expect(board.revealedCardStack.length).toEqual(0);
});

//Przeniesienie karty innej niż Król ze stosu kart do dobierania na puste pole do gry - Kuba
test('Passing a card other than a King card from reveal deck to an empty game stack', () => {
    let board = new Board();

    board.gameStacks[0] = []; //pusty stos
    board.revealedCardStack = [ new Card(10) ]; //Walet karo
    
    board.moveFromRevealedToGameStack(0);

    let gamestack0_length = board.gameStacks[0].length;

    expect(gamestack0_length).toEqual(0);
    expect(board.revealedCardStack[0].rank).toBe('J');
    expect(board.revealedCardStack.length).toEqual(1);
});

//Przeniesienie prawidłowej karty ze stosu kart do dobierania na stos kart do gry
test('Passing correct card from reveal deck to a game stack', () => {
    let board = new Board();

    board.revealedCardStack = [ new Card(14) ]; // Dwójka kier
    let card_from_revealedCardStack = board.revealedCardStack[0];
    board.gameStacks[0] = [ new Card(28) ]; // trójka pik 

    board.moveFromRevealedToGameStack(0);

    let gamestack0_length = board.gameStacks[0].length;

    expect(gamestack0_length).toEqual(2);
    expect(board.gameStacks[0][board.gameStacks[0][board.gameStacks[0].length - 1]]).toBe(card_from_revealedCardStack);
    expect(board.revealedCardStack[0]).toBeUndefined();
    expect(board.revealedCardStack.length).toEqual(0);
});

//Przeniesienie nieprawidłowej karty ze stosu kart do dobierania na stos kart do gry
test('Passing incorrect card from reveal deck to a game stack', () => {
    let board = new Board();

    board.revealedCardStack = [new Card(28) ]; // Dwójka kier
    let card_from_revealedCardStack = board.revealedCardStack[0];
    board.gameStacks[0] = [  new Card(14) ]; // trójka pik 
    let card_from_gamestack0 = board.gameStacks[0][0];

    board.moveFromRevealedToGameStack(0);

    let gamestack0_length = board.gameStacks[0].length;

    expect(gamestack0_length).toEqual(1);
    expect(board.gameStacks[0][board.gameStacks[0][board.gameStacks[0].length - 1]]).toBe(card_from_gamestack0);
    expect(board.revealedCardStack[0]).toBe(card_from_revealedCardStack);
    expect(board.revealedCardStack.length).toEqual(1);
});

//Przeniesienie dwóch kart z jednego stosu do gry na drugi  - Kuba
test('Passing two cards from one game stack to the other', () => {
    let board = new Board();

    board.gameStacks[0][0] = new Card(14); // Dwójka kier
    let card_from_gamestack0 = board.gameStacks[0][0];
    board.gameStacks[1][board.gameStacks[1].length - 1] = new Card(28); // trójka pik

    board.moveBetweenGameStacks(0, 1, 1);

    board.gameStacks[2][board.gameStacks[2].length - 1] = new Card(16) // czwórka kier

    board.moveBetweenGameStacks(1, 2, 2);

    expect(board.gameStacks[0].length).toEqual(0);
    expect(board.gameStacks[1].length).toEqual(1);
    expect(board.gameStacks[2].length).toEqual(5);
    expect(board.gameStacks[2][board.gameStacks[2].length - 1]).toBe(card_from_gamestack0);
});

//Przeniesienie karty innej niż Król z jednego stosu do gry na drugi pusty - Kuba
test('Passing a card other than King from one game stack to the other empty game stack', () => {
    let board = new Board();

    board.gameStacks[0] = []; //pusty stos
    board.gameStacks[1] = [ new Card(10) ]; //Walet karo
    
    board.moveBetweenGameStacks(1, 1, 0);

    let gamestack0_length = board.gameStacks[0].length;

    expect(gamestack0_length).toEqual(0);
    expect(board.gameStacks[1][0].rank).toBe('J');
    expect(board.gameStacks[1].length).toEqual(1);
});

//Przeniesienie karty Król z jednego stosu do gry na drugi pusty - Kuba
test('Passing a King card from one game stack to the other empty game stack', () => {
    let board = new Board();

    board.gameStacks[0] = []; //pusty stos
    board.gameStacks[1] = [ new Card(12) ]; //Król karo
    
    board.moveBetweenGameStacks(1, 1, 0);

    expect(board.gameStacks[0].length).toEqual(1);
    expect(board.gameStacks[0][0].rank).toBe('K');
    expect(board.gameStacks[1].length).toEqual(0);
});

//Przeniesienie karty As ze stosu kart do dobierania na pusty stos do odkładania - Kuba
test('Passing a Ace card from revealed stack to the empty result stack', () => {
    let board = new Board();

    board.revealedCardStack = [ new Card(0) ]; //As kier

    board.moveFromRevealedToResultStack(0);

    expect(board.revealedCardStack.length).toEqual(0);
    expect(board.resultStacks[0].length).toEqual(1);
    expect(board.resultStacks[0][0].rank).toBe('A');
});

//Przeniesienie karty innej niż As ze stosu kart do dobierania na pusty stos do odkładania - Kuba
test('Passing a card other than Ace from revealed stack to the empty result stack', () => {
    let board = new Board();

    board.revealedCardStack = [ new Card(1) ]; //Dwójka kier

    board.moveFromRevealedToResultStack(0);

    expect(board.revealedCardStack.length).toEqual(1);
    expect(board.resultStacks[0].length).toEqual(0);
    expect(board.revealedCardStack[0].rank).toBe('2');
});

//Dołożenie do Asa kolejnej poprawnej karty na stosie do odkładania - Kuba
test('Adding correct card to the result stack, where is an Ace card', () => {
    let board = new Board();

    board.revealedCardStack = [ new Card(0) ]; //As kier

    board.moveFromRevealedToResultStack(0);

    board.revealedCardStack = [ new Card(1) ]; //Dwójka kier
    board.moveFromRevealedToResultStack(0);

    expect(board.revealedCardStack.length).toEqual(0);
    expect(board.resultStacks[0].length).toEqual(2);
    expect(board.resultStacks[0][0].rank).toBe('A');
    expect(board.resultStacks[0][1].rank).toBe('2');
});

//Dołożenie do Asa kolejnej niepoprawnej karty na stosie do odkładania - Kuba
test('Adding incorrect card to the result stack, where is an Ace card', () => {
    let board = new Board();

    board.revealedCardStack = [ new Card(0) ]; //As kier

    board.moveFromRevealedToResultStack(0);

    board.revealedCardStack = [ new Card(2) ]; //Trójka kier
    board.moveFromRevealedToResultStack(0);

    expect(board.revealedCardStack.length).toEqual(1);
    expect(board.resultStacks[0].length).toEqual(1);
    expect(board.resultStacks[0][0].rank).toBe('A');
    expect(board.revealedCardStack[0].rank).toBe('3');
});

