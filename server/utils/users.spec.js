import Card from "./Card";
const users = require("./users");
const expect = require("expect");

test('there is no users on start', () => {
    expect(users.getAllUsers()).toHaveLength(0);
});

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
});

//Adding a user to the room - checking if the user was successfully added
test('Users array is longer after adding a new user', () => {
    users.userJoin(999, 'Paulina', 'name_of_the_room')
    expect(users.getAllUsers()).toHaveLength(1);
});

test('The new user have parameters as set and can be located by id', () => {
    expect(users.getCurrentUser(999)).toStrictEqual({"id": 999, "room": "name_of_the_room", "username": "Paulina"});
});

test('When there is no user with id as required undefined is returned', () => {
    expect(users.getCurrentUser(998)).toBe(undefined);
});

//Deleting a user
test('It is possible to delete a user by his id', () => {
    users.userLeave(999)
    expect(users.getAllUsers()).toHaveLength(0);
});

//ATTENTION: visible problem - deleting a user results only in deletion of the first user with required id in the users array so it is random in great part - there should be unambiguity in this function
test('It is not possible to add two users with the same id', () => {
    users.userJoin(1000, 'user1', 'name_of_the_room')
    users.userJoin(1000, 'user2', 'name_of_the_room')
    expect(users.getAllUsers()).toHaveLength(1);
});

//ATTENTION: visible problem - it is possible to add two users with the same id - problem related to the previous one
//Adding and deleting several users
test('It is possible to add several users at once', () => {
    users.userLeave(1000);
    users.userLeave(1000);
    var i;
    for (i = 0; i < 100; i++)
    {
        users.userJoin(i, 'user' + i, 'name_of_the_room')
    }  
    expect(users.getAllUsers()).toHaveLength(100);
});

test('It is possible to delete several users at once', () => {
    var i;
    for (i = 0; i < 100; i++)
    {
        users.userLeave(i, 'user' + i, 'name_of_the_room')
    }  
    expect(users.getAllUsers()).toHaveLength(0);
});

test('Checking room users list only users of the correct room', () => {
    users.userJoin(0, 'user1', 'r1');
    users.userJoin(1, 'user2', 'r1');
    users.userJoin(2, 'user3', 'r2');
    users.userJoin(3, 'user4', 'r2');
    expect(users.getRoomUsers('r2')).toStrictEqual([{"id": 2, "room": "r2", "username": "user3"}, {"id": 3, "room": "r2", "username": "user4"}]);
});

test('Getting all users list all users', () => {
    expect(users.getAllUsers()).toStrictEqual([{"id": 0, "room": "r1", "username": "user1"}, {"id": 1, "room": "r1", "username": "user2"}, {"id": 2, "room": "r2", "username": "user3"}, {"id": 3, "room": "r2", "username": "user4"}])
});

test('Modyfing room results in changing a name for this room', () => {
    users.modifyRoom('r1', 'new_name');
    expect(users.getRoomUsers('new_name')).toStrictEqual([{"id": 0, "room": "new_name", "username": "user1"}, {"id": 1, "room": "new_name", "username": "user2"}]);
});
