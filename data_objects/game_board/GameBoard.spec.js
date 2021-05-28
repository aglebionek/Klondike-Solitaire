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

//Przeniesienie karty z jednego stosu do gry na drugi  - Kuba
test('Passing a card from one game stack to the other', () => {
    let board = new Board();

    const card_from_gamestack =board.gameStacks[0][0];
    let passed = false;

    while (!passed){
        if(card_from_gamestack.isDescensingAndOppositeTo(board.gameStacks[1][board.gameStacks[1].length - 1])){
            board.moveBetweenGameStacks(0, 1, 1);
            passed = true;
        }
        else{
            board = new Board();
        }
    }

    expect(length(board.gameStacks[0])).toBeEqual(0);
    expect(length(board.gameStacks[1])).toBeEqual(3);
});

//Przeniesienie Króla ze stosu kart do dobierania na puste pole do gry - Kuba
test('Passing a King card from reveal deck to an empty game stack', () => {
    let board = new Board();

    const card_from_gamestack =board.gameStacks[0][0];
    let passed1 = false;
    let passed2 = false;


    while(!passed1 && !passed2){
        while (!passed1){
            if(card_from_gamestack.isDescensingAndOppositeTo(board.gameStacks[1][board.gameStacks[1].length - 1])){
                board.moveBetweenGameStacks(0, 1, 1);
                passed1 = true;
            }
            else{
                board = new Board();
            }

            while (!passed2){
                for (let i = 0 ; i < board.deck.length ; i++){
                    board.passCardToRevealedStack();
                    let peeked_card = board.revealedCardStack[board.revealedCardStack.length - 1 ];

                    if (peeked_card.rank === 'K'){
                        board.moveFromRevealedToGameStack(0);
                        passed2 = true;
                    }
                }
                if (!passed2){
                    board = new Board();
                    passed1 = false;
                }
            }
        }
    }
    expect(length(board.gameStacks[0])).toBeEqual(1);
    expect(board.gameStacks[0][0].rank).toBe('K');
});   

//Przeniesienie karty innej niż Król ze stosu kart do dobierania na puste pole do gry - Kuba
test('Passing a card other than a King card from reveal deck to an empty game stack', () => {
    let board = new Board();

    const card_from_gamestack =board.gameStacks[0][0];
    let passed1 = false;
    let passed2 = false;

    while(!passed1 && !passed2){
        while (!passed1){
            if(card_from_gamestack.isDescensingAndOppositeTo(board.gameStacks[1][board.gameStacks[1].length - 1])){
                board.moveBetweenGameStacks(0, 1, 1);
                passed1 = true;
            }
            else{
                board = new Board();
            }

            while (!passed2){
                for (let i = 0 ; i < board.deck.length ; i++){
                    board.passCardToRevealedStack();
                    let peeked_card = board.revealedCardStack[board.revealedCardStack.length - 1 ];

                    if (peeked_card.rank !== 'K'){
                        board.moveFromRevealedToGameStack(0);
                        passed2 = true;
                    }
                }
                if (!passed2){
                    board = new Board();
                    passed1 = false;
                }
            }
        }
    }
    expect(length(board.gameStacks[0])).toBeEqual(0);
    expect(board.gameStacks[0][0]).toBeUndefined();
});

//Przeniesienie prawidłowej karty ze stosu kart do dobierania na stos kart do gry
test('Passing correct card from reveal deck to a game stack', () => {
    let board = new Board();
    let deck_length = board.deck.length;

    for (let j = 0 ; j < deck_length ; j++){
        board.passCardToRevealedStack();
        let peeked_card = board.revealedCardStack[board.revealedCardStack.length - 1 ];

        for (let i = 0 ; i < length(board.gameStacks) ; i++ ) {
            if(peeked_card.isDescensingAndOppositeTo(board.gameStacks[i][board.gameStacks[i].length - 1])){
                board.moveFromRevealedToGameStack(i);
                let i_copy = i;
                break;
            }
        } 
        if (typeof i_copy !== 'undefined'){
           break;
        }
    }

    expect(length(board.gameStacks[i_copy][board.gameStacks[i_copy].length - 1])).toBe(peeked_card);
});

//Przeniesienie nieprawidłowej karty ze stosu kart do dobierania na stos kart do gry
test('Passing incorrect card from reveal deck to a game stack', () => {
    let board = new Board();
    let deck_length = board.deck.length;

    for (let j = 0 ; j < deck_length ; j++){
        board.passCardToRevealedStack();
        let peeked_card = board.revealedCardStack[board.revealedCardStack.length - 1 ];

        for (let i = 0 ; i < length(board.gameStacks) ; i++ ) {
            if(!peeked_card.isDescensingAndOppositeTo(board.gameStacks[i][board.gameStacks[i].length - 1])){
                board.moveFromRevealedToGameStack(i);
                let i_copy = i;
                break;
            }
        } 
        if (typeof i_copy !== 'undefined'){
           break;
        }
    }

    expect(length(board.gameStacks[i_copy][board.gameStacks[i_copy].length - 1])).not.toBe(peeked_card);
});

//Przeniesienie dwóch kart z jednego stosu do gry na drugi  - Kuba
test('Passing two cards from one game stack to the other', () => {
    let board = new Board();
    let card_from_gamestack = board.gameStacks[0][0];
    let passed1 = false;
    let passed2 = false;

    while (!passed1 && !passed2){
        while(!passed1){
            for (let i = 1 ; i < board.gameStacks.length ; i++){
                if(card_from_gamestack.isDescensingAndOppositeTo(board.gameStacks[i][board.gameStacks[i].length - 1])){
                   let len_1 = board.gameStacks[i].length;
                   board.moveBetweenGameStacks(0, 1, i);
                   let i_copy = i;
                   passed1 = true;
                   break;
                }
            }
            if (typeof i_copy !== 'undefined'){
                break;
            }
            else{
                board = new Board();
                passed1 = false;
            }
        }
        card_from_gamestack = board.gameStacks[i_copy][board.gameStacks[i_copy].length - 2];

        while(!passed2){
            for (let j = 2 ; j < board.gameStacks.length ; j++){
                if(card_from_gamestack.isDescensingAndOppositeTo(board.gameStacks[j][board.gameStacks[j].length - 1])){
                    let len_2 = board.gameStacks[j].length;
                    board.moveBetweenGameStacks(i_copy, 2, j);
                    passed2 = true;
                    let j_copy = j;
                    break;
                }
            }  
            if (typeof j_copy !== 'undefined'){
                break;
            }
            else{
                board = new Board();
                passed1 = false;
                passed2 = false;
            }
        }
    }
    expect(length(board.gameStacks[0])).toBeEqual(0);
    expect(length(board.gameStacks[i_copy])).toBeEqual(len_1 - 1);
    expect(length(board.gameStacks[j_copy])).toBeEqual(len_2 + 2);
});

//Przeniesienie karty innej niż Król z jednego stosu do gry na drugi pusty - Kuba
test('Passing a card other than King from one game stack to the other empty game stack', () => {
    let board = new Board();
    let card_from_gamestack =board.gameStacks[0][0];
    let passed1 = false;
    let passed2 = false;

    while(!passed1 && !passed2){
        while (!passed1){
            for (let i = 1 ; i < board.gameStacks.length ; i++){
                if(card_from_gamestack.isDescensingAndOppositeTo(board.gameStacks[i][board.gameStacks[i].length - 1])){
                   let len_1 = board.gameStacks[i].length;
                   board.moveBetweenGameStacks(0, 1, i);
                   let i_copy = i;
                   passed1 = true;
                   break;
                }
            }
            if (typeof i_copy !== 'undefined'){
                break;
            }
            else{
                board = new Board();
                passed1 = false;
            }
        }
        while (!passed2){
           for (let j = 1 ; j < board.gameStacks.length ; j++){
                let peeked_card = board.gameStacks[j][board.gameStacks[j].length - 1 ];

                if (peeked_card.rank !== 'K'){
                    let len_2 = board.gameStacks[j].length;
                    board.moveBetweenGameStacks(j, 1, 0);
                    let j_copy = j;
                    passed2 = true;
                    break;
                }
            }

            if (typeof j_copy !== 'undefined'){
                break;
            }
            else{
                board = new Board();
                passed1 = false;
                passed2 = false;
            }
        }
    }
    expect(length(board.gameStacks[0])).toBeEqual(0);
    expect(length(board.gameStacks[i_copy])).toBeEqual(len_1 + 1);
    expect(length(board.gameStacks[j_copy])).toBeEqual(len_2);
});

//Przeniesienie karty Król z jednego stosu do gry na drugi pusty - Kuba
test('Passing a King card from one game stack to the other empty game stack', () => {
    let board = new Board();
    let card_from_gamestack =board.gameStacks[0][0];
    let passed1 = false;
    let passed2 = false;

    while(!passed1 && !passed2){
        while (!passed1){
            for (let i = 1 ; i < board.gameStacks.length ; i++){
                if(card_from_gamestack.isDescensingAndOppositeTo(board.gameStacks[i][board.gameStacks[i].length - 1])){
                   let len_1 = board.gameStacks[i].length;
                   board.moveBetweenGameStacks(0, 1, i);
                   let i_copy = i;
                   passed1 = true;
                   break;
                }
            }
            if (typeof i_copy !== 'undefined'){
                break;
            }
            else{
                board = new Board();
                passed1 = false;
            }
        }
        while (!passed2){
           for (let j = 1 ; j < board.gameStacks.length ; j++){
                let peeked_card = board.gameStacks[j][board.gameStacks[j].length - 1 ];

                if (peeked_card.rank === 'K'){
                    let len_2 = board.gameStacks[j].length;
                    board.moveBetweenGameStacks(j, 1, 0);
                    let j_copy = j;
                    passed2 = true;
                    break;
                }
            }

            if (typeof j_copy !== 'undefined'){
                break;
            }
            else{
                board = new Board();
                passed1 = false;
                passed2 = false;
            }
        }
    }
    expect(length(board.gameStacks[0])).toBeEqual(1);
    expect(length(board.gameStacks[j_copy])).toBeEqual(len_2);
});

//Przeniesienie karty As ze stosu kart do dobierania na pusty stos do odkładania - Kuba
test('Passing a Ace card from revealed stack to the empty result stack', () => {
    let board = new Board();
    let passed = false;

    while(!passed){
        for (let i = 0 ; board.deck.length ; i++){
            board.moveFromRevealedToGameStack();
            peeked_card = board.revealedCardStack[board.revealedCardStack.length - 1];

            if (peeked_card.rank === 'A'){
                board.moveFromRevealedToResultStack(0);
                passed = true;
                break;
            }
        }
        if (!passed){
            board = new Board();
        }
    }
    expect(length(board.resultStacks[0])).toBeEqual(1);
    expect(board.resultStacks[0].rank).toBe('A');
});

//Przeniesienie karty innej niż As ze stosu kart do dobierania na pusty stos do odkładania - Kuba
test('Passing a card other than Ace from revealed stack to the empty result stack', () => {
    let board = new Board();
    let passed = false;

    while(!passed){
        for (let i = 0 ; board.deck.length ; i++){
            board.moveFromRevealedToGameStack();
            peeked_card = board.revealedCardStack[board.revealedCardStack.length - 1];

            if (peeked_card.rank !== 'A'){
                board.moveFromRevealedToResultStack(0);
                passed = true;
                break;
            }
        }
        if (!passed){
            board = new Board();
        }
    }
    expect(length(board.resultStacks[0])).toBeEqual(0);
    expect(board.resultStacks[0]).toBeUndefined();
});

//Przeniesienie karty innej niż As ze stosu kart do dobierania na pusty stos do odkładania - Kuba
test('Passing a card other than Ace from revealed stack to the empty result stack', () => {
    let board = new Board();
    let passed1 = false;
    let passed2 = false;

    while(!passed1 && !passed2){
        while(!passed1){
            for (let i = 0 ; i < board.deck.length ; i++){
                board.moveFromRevealedToGameStack();
                peeked_card = board.revealedCardStack[board.revealedCardStack.length - 1];

                if (peeked_card.rank === 'A'){
                    board.moveFromRevealedToResultStack(0);
                    passed1 = true;
                    break;
                }
            }
            if (!passed1){
                board = new Board();
            }
        }
        while(!passed2){
            for (let i = 0 ; board.deck.length * 2 ; i++){
                board.moveFromRevealedToGameStack();
                peeked_card = board.revealedCardStack[board.revealedCardStack.length - 1];
            
                if (peeked_card.rank === '2'){
                    board.moveFromRevealedToResultStack(0);
                    passed2 = true;
                    break;
                }
            }
            if (!passed2){
                board = new Board();
                passed1 = false
            }
        }
    }

    expect(length(board.resultStacks[0])).toBeEqual(2);
    expect(board.resultStacks[board.resultStacks - 1].rank).toBe('2');
});