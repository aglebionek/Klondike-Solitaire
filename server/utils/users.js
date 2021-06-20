const users = [];

// USERS

const userJoin = (id, username, room) => {
  const user = {
    id,
    username,
    room,
    inGame: false
  };

  users.push(user);

  return user;
};

const getCurrentUser = id => {
  return users.find(user => user.id === id);
}

const userLeave = id => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1){
    return users.splice(index, 1)[0];
  }
};

const getAllUsers = () => {
  return users;
};

// ROOMS

const getRoomUsers = room => {
  return users.filter(user => user.room === room);
};

const setUsersInGame = room => {
  const users = getRoomUsers(room);

  users.forEach(user => user.inGame = true)
}

const setUsersOutOfGame = room => {
  const users = getRoomUsers(room);

  users.forEach(user => user.inGame = false);
}

const modifyRoom = (room, newName) => {
  users.forEach(user => {
    if (user.room === room){
      user.room = newName;
    }
  });
}

module.exports = {
  userJoin,
  getCurrentUser, 
  userLeave,
  getRoomUsers,
  modifyRoom,
  getAllUsers,
  setUsersInGame,
  setUsersOutOfGame
};