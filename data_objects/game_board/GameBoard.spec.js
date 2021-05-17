import Board from "./GameBoard";

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
    expect(length(board.resultStacks)).toEqual(4);
});

//Sprawdzam istnienie pól do gry - Kuba
test("Checking if game stacks exists", () => {
    let board = new Board();
    expect(board.gameStacks).toBeDefined();
});

//Sprawdzam ilość pól do gry - Kuba
test("Checking number of game stacks", () => {
    let board = new Board();
    expect(length(board.gameStacks)).toEqual(7);
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
    expect(board.gameStacks[0].length).toBeEqual(1)
});

//Spawdzam czy ilość kart w polu do gry numer 1 jest poprawna - Kuba
test("Checking if number of cards in game stack 1 is correct", () =>{
    let board = new Board();
    expect(board.gameStacks[1].length).toBeEqual(2)
});

//Spawdzam czy ilość kart w polu do gry numer 2 jest poprawna - Kuba
test("Checking if number of cards in game stack 2 is correct", () =>{
    let board = new Board();
    expect(board.gameStacks[2].length).toBeEqual(3)
});

//Spawdzam czy ilość kart w polu do gry numer 3 jest poprawna - Kuba
test("Checking if number of cards in game stack 3 is correct", () =>{
    let board = new Board();
    expect(board.gameStacks[3].length).toBeEqual(4)
});

//Spawdzam czy ilość kart w polu do gry numer 4 jest poprawna - Kuba
test("Checking if number of cards in game stack 4 is correct", () =>{
    let board = new Board();
    expect(board.gameStacks[4].length).toBeEqual(5)
});

//Spawdzam czy ilość kart w polu do gry numer 5 jest poprawna - Kuba
test("Checking if number of cards in game stack 5 is correct", () =>{
    let board = new Board();
    expect(board.gameStacks[5].length).toBeEqual(6)
});

//Spawdzam czy ilość kart w polu do gry numer 6 jest poprawna - Kuba
test("Checking if number of cards in game stack 6 is correct", () =>{
    let board = new Board();
    expect(board.gameStacks[6].length).toBeEqual(7)
});

//Sprawdzam czy pole do odkładnia kart 0 jest puste - Kuba
test("Checking if result stack 0 is empty", () => {
    let board = new Board();
    expect(board.resultStacks[0]).toBeEqual(0);
});

//Sprawdzam czy pole do odkładnia kart 1 jest puste - Kuba
test("Checking if result stack 1 is empty", () => {
    let board = new Board();
    expect(board.resultStacks[1]).toBeEqual(0);
});

//Sprawdzam czy pole do odkładnia kart 2 jest puste - Kuba
test("Checking if result stack 2 is empty", () => {
    let board = new Board();
    expect(board.resultStacks[2]).toBeEqual(0);
});

//Sprawdzam czy pole do odkładnia kart 3 jest puste - Kuba
test("Checking if result stack 3 is empty", () => {
    let board = new Board();
    expect(board.resultStacks[3]).toBeEqual(0);
});

//Sprawdzam czy ilość kart do dobrania jest poprawna - Kuba
test("Checking if number of cards to draw is correct", () => {
    let board = new Board();
    expect(board.deck.length).toBeEqual(24);
});

//Sprawdzam czy przekazywanie karty ze stosu kart do stosu kart do dobierania - Kuba
test("Checking if function to passing card to reveal stack passes the card", () => {
    let board = new Board();

    board.passCardToRevealedStack();
    expect(board.revealedCardStack.length).toBeEqual(1);
});

//Zapełnienie całego stosu kart do dobierania - Kuba
test("Making revealed stack full", () => {
    let board = new Board();

    let i = 0;
    while (i < 24){
        board.passCardToRevealedStack();
        i++;
    }
    expect(board.revealedCardStack.length).toBeEqual(24);
});

//Przekazanie jednej więcej karty, gdy stos do dobierania jest pełny - Kuba
test("Passing one more card when the revealed stack full", () => {
    let board = new Board();

    let i = 0;
    while (i < 25){
        board.passCardToRevealedStack();
        i++;
    }
    expect(board.revealedCardStack.length).toBeEqual(0);
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
    }
});
