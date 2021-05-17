const users = require("./users");

test('there is no users on start', () => {
    expect(users.getAllUsers()).toHaveLength(0);
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
    let i;
    for (i = 0; i < 100; i++) {
        users.userJoin(i, 'user' + i, 'name_of_the_room')
    }
    expect(users.getAllUsers()).toHaveLength(100);
});

test('It is possible to delete several users at once', () => {
    let i;
    for (i = 0; i < 100; i++) {
        users.userLeave(i, 'user' + i, 'name_of_the_room')
    }
    expect(users.getAllUsers()).toHaveLength(0);
});

test('Checking room users list only users of the correct room', () => {
    users.userJoin(0, 'user1', 'r1');
    users.userJoin(1, 'user2', 'r1');
    users.userJoin(2, 'user3', 'r2');
    users.userJoin(3, 'user4', 'r2');
    expect(users.getRoomUsers('r2')).toStrictEqual([{"id": 2, "room": "r2", "username": "user3"}, {
        "id": 3,
        "room": "r2",
        "username": "user4"
    }]);
});

test('Getting all users list all users', () => {
    expect(users.getAllUsers()).toStrictEqual([{"id": 0, "room": "r1", "username": "user1"}, {
        "id": 1,
        "room": "r1",
        "username": "user2"
    }, {"id": 2, "room": "r2", "username": "user3"}, {"id": 3, "room": "r2", "username": "user4"}])
});

test('Modyfing room results in changing a name for this room', () => {
    users.modifyRoom('r1', 'new_name');
    expect(users.getRoomUsers('new_name')).toStrictEqual([{"id": 0, "room": "new_name", "username": "user1"}, {
        "id": 1,
        "room": "new_name",
        "username": "user2"
    }]);
});