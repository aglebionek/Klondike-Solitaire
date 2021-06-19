const express = require("express");
const cookieParser = require("cookie-parser");
const exampleRoute = require("./api/example/exampleRoute");
const roomsRoute = require("./api/rooms/roomsRoute");
const settingsRoute = require("./api/settings/settingsRoute");
const statsRoute = require("./api/stats/statsRoute");
const authRoute = require("./api/auth/authRoute");
const accountRoute = require("./api/account/accountRoute");
const gameRoute = require("./api/game/gameRoute");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  modifyRoom,
  getAllUsers,
  setUsersInGame,
  setUsersOutOfGame
} = require("./utils/users");
require("dotenv").config();
app.use(cookieParser());

const server = app.listen(PORT);

const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("export-users", () => {
    socket.emit("pass-users", getAllUsers().filter(user => !user.inGame));
  });

  socket.on("export-room", () => {
    const user = getCurrentUser(socket.id);

    if (user) {
      socket.emit("pass-room", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });

  socket.on("game-start", ({ room, time, id }) => {
    setUsersInGame(room);
    io.to(room).emit('start', { time, id });
  });

  socket.on("send-shuffle", ({ shuffle, time, id }) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("get-shuffle", { shuffle, time, id });
  })

  socket.on("lobby-modify", ({ room, newName }) => {
    const user = getCurrentUser(socket.id);
    
    modifyRoom(room, newName);

    if(user){
      io.to(newName).emit("pass-room", {
        room,
        users: getRoomUsers(newName),
      });
    }
  });

  socket.on("lobby-join", ({ player, room }) => {
    const user = userJoin(socket.id, player, room);

    console.log("a user joined the room");
    socket.join(user.room);

    if(user){
      io.to(room).emit("pass-room", {
        room,
        users: getRoomUsers(room),
      });
    }
  });

  socket.on("lobby-leave", () => {
    const user = getCurrentUser(socket.id);

    userLeave(socket.id);

    if(user){
      io.to(user.room).emit("pass-room", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });

  socket.on("kick", ({ player }) => {
    userLeave(player.id);
    io.to(player.id).emit("kicked", { room: player.room });

    io.to(player.room).emit("pass-room", {
      room: player.room,
      users: getRoomUsers(player.room),
    });
  });

  socket.on("end-game", ({ score }) => {
    const player = getCurrentUser(socket.id);

    io.to(player.room).emit("write-to-end-list", {
      player: player.username,
      score: score
    });
  })
 
  socket.on("disconnect", () => {
    console.log("user disconnected");
    userLeave(socket.id);
    socket.emit("export-room");
  });
});

app.use("/example", exampleRoute);
app.use("/rooms", roomsRoute);
app.use("/auth", authRoute);
app.use("/stats", statsRoute);
app.use("/settings", settingsRoute);
app.use("/account", accountRoute);
app.use("/game", gameRoute);

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
