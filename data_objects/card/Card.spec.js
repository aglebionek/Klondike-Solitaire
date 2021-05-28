test('throw exception when invalid ID', () => {
    expect(() => {
        new Card(52);
    }).toThrow();
});

//Sprawdzam czy błąd wyskakuje przy użyciu ID spoza zakresu(-1)-Robert
test('throw exception when invalid ID', () => {
    expect(() => {
        new Card(-1);
    }).toThrow();
});
/////////////////////////Test gettera "rank()"///////////////////////////////
//Sprawdzam czy getter rank() zwraca "A" gdy id=13-Robert
describe("Checking rank getter while id=13, expected:A", () => {
    let card = new Card(13);
    test("Should return A", () => {
        expect(card.rank).toBe("A");
    });
});
//Sprawdzam czy getter rank() zwraca "J" gdy id=23-Robert
describe("Checking rank getter while id=23, expected:J", () => {
    let card = new Card(23);
    test("Should return J", () => {
        expect(card.rank).toBe("J");
    });
});
//Sprawdzam czy getter rank() zwraca "Q" gdy id=24-Robert
describe("Checking rank getter while id=24, expected:Q", () => {
    let card = new Card(24);
    test("Should return Q", () => {
        expect(card.rank).toBe("Q");
    });
});
//Sprawdzam czy getter rank() zwraca "K" gdy id=25-Robert
describe("Checking rank getter while id=25, expected:K", () => {
    let card = new Card(25);
    test("Should return K", () => {
        expect(card.rank).toBe("K");
    });
});
//Sprawdzam czy getter rank() zwraca "7" gdy id=32-Robert
describe("Checking rank getter while id=32, expected:7", () => {
    let card = new Card(32);
    test("Should return 7", () => {
        expect(card.rank).toBe("7");
    });
});
/////////////////////////Test gettera "suite()"//////////////////////////////
//Sprawdzam czy karta jest uznawana jako diament, gdy id=12-Robert
describe("Checking suite() getter while id=12, expected: diamonds", () => {
    let card = new Card(12);
    test("Should return diamonds", () => {
        expect(card.suite).toBe("diamonds");
    });
});
//Sprawdzam czy karta jest uznawana jako serce, gdy id=13-Robert
describe("Checking suite() getter while id=13, expected: hearts", () => {
    let card = new Card(13);
    test("Should return hearts", () => {
        expect(card.suite).toBe("hearts");
    });
});
//Sprawdzam czy karta jest uznawana jako pik, gdy id=38-Robert
describe("Checking suite() getter while id=38, expected: spades", () => {
    let card = new Card(38);
    test("Should return spades", () => {
        expect(card.suite).toBe("spades");
    });
});
//Sprawdzam czy karta jest uznawana jako trefl, gdy id=51-Robert
describe("Checking suite() getter while id=51, expected: clubs", () => {
    let card = new Card(51);
    test("Should return clubs", () => {
        expect(card.suite).toBe("clubs");
    });
});
/////////////////////////Test funkcji: "isAscendingCardInSuiteTo"/////////////
//Sprawdzam D6 i D5(Czy nałożenie na stosie zwycięstwa jest możliwe)-Robert
test("Checking isAscendingCardInSuiteTo function", () => {
    let card = new Card(7);
    let card1 = new Card(6);
    expect((card.isAscendingCardInSuiteTo(card1))).toBeTruthy();
});
//Sprawdzam D6 i C5(Czy nałożenie na stosie zwycięstwa jest możliwe)-Robert
test("Checking isAscendingCardInSuiteTo function", () => {
    let card = new Card(7);
    let card1 = new Card(19);
    expect((card.isAscendingCardInSuiteTo(card1))).toBeFalsy();
});
//Sprawdzam H6 i S9(Czy nałożenie na stosie zwycięstwa jest możliwe)-Robert
test("Checking isAscendingCardInSuiteTo function", () => {
    let card = new Card(33);
    let card1 = new Card(47);
    expect((card.isAscendingCardInSuiteTo(card1))).toBeFalsy();
});
/////////////////////////Test funkcji: "isDescendingAndOppositeTo"////////////
//Sprawdzam D6 i D5(Czy nałożenie na stosie kart jest możliwe)-Robert
test("Checking isDescendingAndOppositeTo function", () => {
    let card = new Card(12);
    let card1 = new Card(12);
    expect((card.isDescendingAndOppositeTo(card1))).toBeFalsy();
});
//Sprawdzam D6 i C5(Czy nałożenie na stosie kart jest możliwe)-Robert
test("Checking isDescendingAndOppositeTo function", () => {
    let card = new Card(12);
    let card1 = new Card(12);
    expect((card.isDescendingAndOppositeTo(card1))).toBeTruthy();
});
//Sprawdzam D6 i D5(Czy nałożenie na stosie kart jest możliwe)-Robert
test("Checking isDescendingAndOppositeTo function", () => {
    let card = new Card(12);
    let card1 = new Card(12);
    expect((card.isDescendingAndOppositeTo(card1))).toBeFalsy();
});

import Card from "./Card";


test('throw exception when invalid ID', () => {
    expect(() => {
        new Card(52);
    }).toThrow();
});
//********Test dla funkcji "cardCode"******** - Piotrek
///Spawdzam czy funkcja dobrze koduje daną kartę, tj. np. dla id = 4
/// jest to 5 karo, kod: D5 (diamonds, 5)
describe("Checking cardCode function", () => {
    let card = new Card(4);
    test("Should return code: D5", () => {
        expect(card.cardCode).toBe("D5");
    });
});
///Spawdzam czy funkcja dobrze koduje daną kartę, tj. np. dla id = 20
/// jest to 7 kier, kod: H8 (hearts, 8)
describe("Checking cardCode function", () => {
    let card = new Card(20);
    test("Should return code: H8", () => {
        expect(card.cardCode).toBe("H8");
    });
});
///Spawdzam czy funkcja dobrze koduje daną kartę, tj. np. dla id = 37
/// jest to królowa pik, kod: SQ (spades, Q)
describe("Checking cardCode function", () => {
    let card = new Card(37);
    test("Should return code: SQ", () => {
        expect(card.cardCode).toBe("SQ");
    });
});
///Spawdzam czy funkcja dobrze koduje daną kartę, tj. np. dla id = 40
/// jest to 2 trefl, kod: C2 (clubs, 2)
describe("Checking cardCode function", () => {
    let card = new Card(40);
    test("Should return code: C2", () => {
        expect(card.cardCode).toBe("C2");
    });
});