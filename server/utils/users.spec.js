const users = require("./users");
const expect = require("expect");

test('there is no users on start', () => {
    expect(users.getAllUsers()).toHaveLength(0);
});